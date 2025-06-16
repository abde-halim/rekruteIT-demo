import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { createCandidate } from '../../features/candidatSlice';
import { regions } from '../../consts/regions';

const CandidatForm = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.candidateSlice);
  const candidateId = localStorage.getItem("id");
  const [formData, setFormData] = useState({
    userId: candidateId,
    telephone: '',
    ville: '',
    region: '',
    nom: '',
    prenom: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (data && !loading && !error) {
      alert('Candidat enregistré avec succès!');
      setFormData({
        userId: candidateId,
        telephone: '',
        ville: '',
        region: '',
        nom: '',
        prenom: '',
      });
      setImageFile(null);
      setPreview(null);
    }
  }, [data, loading, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setPreview(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (imageFile) {
      form.append('image', imageFile);
    }

    try {
      await dispatch(createCandidate(form)).unwrap();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Erreur: ' + (error || "Une erreur s'est produite."));
    }
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
      setForm((prevForm) => ({
        ...prevForm,
        image: imageUrl,
      }));
      await dispatch(
        cretaeCandidate(formData)
      );

      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold inline-block">
            <span className="text-yellow-400 font-bold">Rekrute</span>
            <span className="ml-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">IT</span>
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <input
          type="hidden"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium mb-1">nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Entrez votre nom..."
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">prenom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Entrez votre prenom..."
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium mb-1">Âge</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Entrez votre âge..."
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium mb-1">telephone</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Entrez votre telephone..."
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Région</label>
          {/* <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="Entrez votre région..."
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          /> */}
          <select
            className="w-full p-3 border border-gray-100 rounded-2xl my-1"
            value={formData.region}
            name="region"
            onChange={handleChange}
          >
            <option value="" disabled>Select Location</option>
            {regions.map((region, i) => (
              <option key={i} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image de Profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {preview && (
            <div className="relative mt-4 w-32 h-32 group">
              <img
                src={preview}
                alt="Aperçu"
                className="w-full h-full object-cover rounded-lg border shadow"
              />
              <button
                type="button"
                onClick={handleImageDelete}
                disabled={loading}
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </>
          ) : (
            'Enregistrer'
          )}
        </button>
      </form>
    </div>
  );
};

export default CandidatForm;