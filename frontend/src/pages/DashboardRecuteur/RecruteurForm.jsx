import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { createRecruteur } from "../../features/recruteurSlice";
import { regions } from "../../consts/regions";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";
import { useNavigate } from "react-router-dom";

const RecruteurForm = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, currentRecruteur } = useSelector(
    (state) => state.recruteurSlice
  );


  const candidateId = localStorage.getItem("id");
  const [formData, setFormData] = useState({
    userId: candidateId,
    description: "",
    ville: "",
    region: "",
    telephone: "",
    siteWeb: "",
    logo: "",
    nomSociete: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false)


  useEffect(() => {
    if (currentRecruteur && !loading && !error) {
      alert("Recruteur enregistré avec succès!");
      setFormData({
        userId: candidateId,
        description: "",
        ville: "",
        region: "",
        telephone: "",
        siteWeb: "",
        logo: "",
        nomSociete: "",
      });
    }
  }, [currentRecruteur, loading, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData((prevForm) => ({
        ...prevForm,
        logo: imageUrl,
      }));

      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createRecruteur(form));
      await localStorage.setItem("valid", true);
      await Navigate("/RecruteurDashboard")
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      alert("Erreur: " + (error || "Une erreur s'est produite."));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold inline-block">
            <span className="text-yellow-400 font-bold">Rekrute</span>
            <span className="ml-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">
              IT
            </span>
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <input type="hidden" name="userId" value={formData.userId} />

        <div>
          <label className="block text-sm font-medium mb-1"> nom du societe</label>
          <input
            name="nomSociete"
            type="text"
            value={formData.nomSociete}
            onChange={handleChange}
            placeholder="Entrez le nom du societe..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 "
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">telephone</label>
          <input
            name="telephone"
            type="tel"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Entrez votre telephone..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 "
            disabled={loading}
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Ville</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            placeholder="Entrez votre ville..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 "
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Région</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 "
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="" disabled>Select Location</option>
            {regions.map((region, i) => (
              <option key={i} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Site Web</label>
          <input
            type="text"
            name="siteWeb"
            value={formData.siteWeb}
            onChange={handleChange}
            placeholder="Ex: https://votresite.com"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 "
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Entrez une description..."
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 "
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={loading}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {uploadingImage && (
            <div className="flex items-center text-blue-500 text-sm">
              Uploading image...
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enregistrement...
            </>
          ) : (
            "Enregistrer"
          )}
        </button>
      </form>
    </div>
  );
};

export default RecruteurForm;
