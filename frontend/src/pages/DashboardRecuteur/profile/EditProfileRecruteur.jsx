import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/dashboardRecruteur/Sidebar'
import Footer from '../../../components/dashboardRecruteur/Footer'
import Navbar from '../../../components/dashboardRecruteur/Navbar'
import { Camera } from 'lucide-react'
import { regions } from '../../../consts/regions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecruteurById, updateRecruteur } from '../../../features/recruteurSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { uploadImageToCloudinary } from '../../../utils/uploadImageToCloudinary'

function EditProfileRecruteur() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nomSociete: "",
        ville: "",
        region: "",
        telephone: "",
        siteWeb: "",
        description: ""
    })

    const { currentRecruteur: data, loading, error, user } = useSelector((state) => state.recruteurSlice)
    const dispatch = useDispatch()
    const [uploadingImage, setUploadingImage] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                await dispatch(fetchRecruteurById(localStorage.getItem("id")))
            } catch (err) {
                toast.error('Erreur de réseau.')
            }
        }
        fetchUser()
    }, [dispatch])

    useEffect(() => {
        if (data) {
            setForm({
                nomSociete: data.nomSociete || "",
                ville: data.ville || "",
                region: data.region || "",
                telephone: data.telephone || "",
                siteWeb: data.siteWeb || "",
                description: data.description || ""
            })
        }
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(updateRecruteur({
                id: localStorage.getItem("id"),
                recruteurData: form
            }))
            toast.success('Profil mis à jour avec succès!')
            navigate("/profileRecruteur")
        } catch (error) {
            toast.error('Erreur lors de la mise à jour du profil')
        }
    }

    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Chargement...</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
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
                logo: imageUrl,
            }));
            await dispatch(
                updateCandidate({
                    id,
                    recruteurData: { ...form, logo: imageUrl },
                })
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
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar isOpen={true} />
                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Modifier le profil de l'entreprise
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                                            {data?.logo ? (
                                                <img
                                                    src={data?.logo ? `${data.logo}` : '/pics/company.avif'}
                                                    alt="Logo"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <span className="text-gray-400 text-sm">Logo</span>
                                            )}
                                        </div>
                                        <label
                                            htmlFor="logo-upload"
                                            className="absolute bottom-0 right-0   p-2 rounded-full cursor-pointer transition-colors shadow"
                                        >
                                            <Camera className="w-4 h-4 text-white" />
                                            <input
                                                type="file"
                                                id="logo-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                            />
                                        </label>
                                    </div>
                                    {uploadingImage && (
                                        <div className="flex items-center text-blue-500 text-sm">
                                            Uploading image...
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Logo de l'entreprise
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Cliquez sur l'icône pour télécharger un nouveau logo
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Nom de la société
                                        </label>
                                        <input
                                            type="text"
                                            value={form?.nomSociete}
                                            onChange={(e) => handleInputChange('nomSociete', e.target.value)}
                                            placeholder="Nom de votre société"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Site web
                                        </label>
                                        <input
                                            type="url"
                                            value={form.siteWeb}
                                            onChange={(e) => handleInputChange('siteWeb', e.target.value)}
                                            placeholder="https://votre-site.com"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Ville
                                        </label>
                                        <input
                                            type="text"
                                            value={form.ville}
                                            onChange={(e) => handleInputChange('ville', e.target.value)}
                                            placeholder="Ville"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Région
                                        </label>
                                        <select
                                            value={form.region}
                                            onChange={(e) => handleInputChange('region', e.target.value)}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:outline-none"
                                        >
                                            <option value="">Sélectionner une région</option>
                                            {regions.map((region, index) => (
                                                <option key={index} value={region}>
                                                    {region}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.telephone}
                                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                                        placeholder="+212 6 00 00 00 00"
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description de l'entreprise
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={form.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Décrivez votre entreprise, vos activités, votre culture..."
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:outline-none resize-none"
                                    />
                                </div>
                                <div className="flex justify-end space-x-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/profileRecruteur")}
                                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3  text-white rounded-lg  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default EditProfileRecruteur