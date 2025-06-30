from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)

# Load model from current directory
model = SentenceTransformer("model")

@app.route('/match', methods=['POST'])
def match():
    data = request.get_json()
    job = data.get("jobText", "")
    candidate = data.get("candidateText", "")

    if not job or not candidate:
        return jsonify({"error": "Missing input"}), 400

    emb1 = model.encode(job, convert_to_tensor=True)
    emb2 = model.encode(candidate, convert_to_tensor=True)
    score = util.pytorch_cos_sim(emb1, emb2).item()

    return jsonify({
        "score": score,
        "percent": round(score * 100)
    })

if __name__ == '__main__':
    app.run(port=5000)
