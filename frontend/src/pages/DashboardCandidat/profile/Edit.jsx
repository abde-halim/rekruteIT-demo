import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Sidebar from '../../../components/dashboardCandidat/Sidebar'
import Footer from '../../../components/dashboardCandidat/Footer'
import Navbar from '../../../components/dashboardCandidat/Navbar'
import { Camera, X, Edit, Trash2 } from 'lucide-react'
import { languageOptions } from '../../../consts/languages'
import { regions } from '../../../consts/regions'
import { contracts } from '../../../consts/contractsTypes'
import { niveauDetude } from '../../../consts/niveauDetude'
import { experienceType } from '../../../consts/experiences'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidateById, updateCandidate } from '../../../features/candidatSlice'
import {
    fetchLanguagesByCandidate,
    createLanguage,
    updateLanguage,
    deleteLanguage
} from '../../../features/languageSlice'
import {
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} from '../../../features/experienceSlice'
import {
    fetchDiplomesByCandidate,
    createDiplomes,
    updateDiplomes,
    deleteDiplomes
} from '../../../features/diplomeSlice'
import { uploadImageToCloudinary } from '../../../utils/uploadImageToCloudinary'

function EditCandidat() {
    const navigate = useNavigate()
    const [showExperienceForm, setShowExperienceForm] = useState(false)
    const [showEducationForm, setShowEducationForm] = useState(false)
    const [showLanguageForm, setShowLanguageForm] = useState(false)
    const [editingLanguage, setEditingLanguage] = useState(null)
    const [editingEducation, setEditingEducation] = useState(null)
    const [editingExperience, setEditingExperience] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)

    const { data, loading, error } = useSelector((state) => state.candidateSlice)
    const { list: languages, loading: languagesLoading } = useSelector((state) => state.languageSlice)
    const { list: experiences, loading: experiencesLoading } = useSelector((state) => state.experienceSlice)
    const { list: diplomas, loading: diplomasLoading } = useSelector((state) => state.diplomesSlice)

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        ville: "",
        region: "",
        telephone: "",
        email: "", image: "", post: "", niveauScolaire: "", niveauDetude: ""
    })

    const [experience, setExperience] = useState({
        position: "",
        type_contrat: "",
        societe: "",
        type_lieu: "",
        dateDebut: "",
        dateFin: "",
        description: "",
    });

    const [education, setEducation] = useState({
        ecole: "",
        diplome_titre: "",
        specialite: "",
        dateDebut: "",
        dateFin: "",
        description: "",
    })

    const [language, setLanguage] = useState({
        nom_lang: "",
        niveau: "",
    });

    const candidateId = localStorage.getItem("id");





    useEffect(() => {
        const fetchAllData = async () => {
            if (candidateId) {
                try {
                    await dispatch(fetchCandidateById(candidateId));
                    await dispatch(fetchLanguagesByCandidate(candidateId));
                    await dispatch(fetchExperiences(candidateId));
                    await dispatch(fetchDiplomesByCandidate(candidateId));
                } catch (err) {
                    toast.error('Erreur de réseau.');
                }
            }
        };
        fetchAllData();
    }, [dispatch, candidateId]);

    useEffect(() => {
        if (data) {
            setForm({
                nom: data.nom || "",
                prenom: data.prenom || "",
                ville: data.ville || "",
                region: data.region || "",
                telephone: data.telephone || "",
                email: data.email || "",
                image: data.image || "",
                post: data.post || "",
                niveauScolaire: data.niveauScolaire || "",
                niveauDetude: data.niveauDetude || "",
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(updateCandidate({ id: candidateId, candidateData: form }));
            toast.success('Profile updated successfully!');
            navigate("/profile");
        } catch (err) {
            toast.error('Error updating profile');
        }
    }

    const handleExperienceSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingExperience) {
                await dispatch(updateExperience({
                    candidateId,
                    experienceId: editingExperience.id,
                    experienceData: experience
                }));
                setEditingExperience(null);
                toast.success('Experience updated successfully!');
            } else {
                await dispatch(createExperience({ candidatId: candidateId, experience }));
                toast.success('Experience added successfully!');
            }
            setShowExperienceForm(false);
            setExperience({
                position: "",
                type_contrat: "",
                societe: "",
                type_lieu: "",
                dateDebut: "",
                dateFin: "",
                description: "",
            });
        } catch (err) {
            toast.error('Error saving experience');
        }
    }

    const handleEducationSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEducation) {
                await dispatch(updateDiplomes({
                    candidateId,
                    diplomaId: editingEducation.id,
                    diplomaData: education
                }));
                setEditingEducation(null);
                toast.success('Education updated successfully!');
            } else {
                await dispatch(createDiplomes({ candidateId, diplomaData: education }));
                toast.success('Education added successfully!');
            }
            setShowEducationForm(false);
            setEducation({
                ecole: "",
                diplome_titre: "",
                specialite: "",
                dateDebut: "",
                dateFin: "",
                description: "",
            });
        } catch (err) {
            toast.error('Error saving education');
        }
    }

    const handleLanguageSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingLanguage) {
                await dispatch(updateLanguage({
                    candidateId,
                    languageId: editingLanguage.id,
                    languageData: language
                }));
                setEditingLanguage(null);
                toast.success('Language updated successfully!');
            } else {
                await dispatch(createLanguage({ candidateId, languageData: language }));
                toast.success('Language added successfully!');
            }
            setShowLanguageForm(false);
            setLanguage({
                nom_lang: "",
                niveau: "",
            });
        } catch (err) {
            toast.error('Error saving language');
        }
    }

    const handleEditExperience = (exp) => {
        setExperience({
            position: exp.position,
            type_contrat: exp.type_contrat,
            societe: exp.societe,
            type_lieu: exp.type_lieu,
            dateDebut: exp.dateDebut,
            dateFin: exp.dateFin,
            description: exp.description || "",
        });
        setEditingExperience(exp);
        setShowExperienceForm(true);
    }

    const handleDeleteExperience = async (experienceId) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await dispatch(deleteExperience({ candidateId, experienceId }));
                toast.success('Experience deleted successfully!');
            } catch (err) {
                toast.error('Error deleting experience');
            }
        }
    }

    const handleEditLanguage = (lang) => {
        setLanguage({
            nom_lang: lang.nom_lang,
            niveau: lang.niveau,
        });
        setEditingLanguage(lang);
        setShowLanguageForm(true);
    }

    const handleDeleteLanguage = async (languageId) => {
        if (window.confirm('Are you sure you want to delete this language?')) {
            try {
                await dispatch(deleteLanguage({ candidateId, languageId }));
                toast.success('Language deleted successfully!');
            } catch (err) {
                toast.error('Error deleting language');
            }
        }
    }

    const handleEditEducation = (diploma) => {
        setEducation({
            ecole: diploma.ecole,
            diplome_titre: diploma.diplome_titre,
            specialite: diploma.specialite,
            dateDebut: diploma.dateDebut,
            dateFin: diploma.dateFin,
            description: diploma.description || "",
        });
        setEditingEducation(diploma);
        setShowEducationForm(true);
    }

    const handleDeleteEducation = async (diplomaId) => {
        if (window.confirm('Are you sure you want to delete this education?')) {
            try {
                await dispatch(deleteDiplomes({ candidateId, diplomaId }));
                toast.success('Education deleted successfully!');
            } catch (err) {
                toast.error('Error deleting education');
            }
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <div>Loading...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-red-500">Error: {error}</div>
                </div>
                <Footer />
            </div>
        );
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
                image: imageUrl,
            }));
            await dispatch(
                updateCandidate({
                    id: candidateId,
                    candidateData: { ...form, image: imageUrl },
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
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar isOpen={true} />
                <main className="flex-1 p-6 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative">
                                    <img
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                        src={data?.image ? `${data.image}` : '/pics/cercle-bleu-utilisateur-blanc_78370-4707.avif'}
                                        alt="Profile"
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer transition-all duration-200"
                                    >
                                        <Camera className="w-5 h-5 text-white" />
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploadingImage}
                                        />
                                    </label>
                                </div>
                                {uploadingImage && (
                                    <div className="flex items-center text-blue-600 text-sm">
                                        Uploading image...
                                    </div>
                                )}

                                <div className="flex-1 w-full">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">Post Name</label>
                                    <input
                                        type="text"
                                        placeholder="post title ex: QA enginner"
                                        value={form.post}
                                        onChange={(e) => setForm({ ...form, post: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    />
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 gap-6"><div className="flex-1">
                                <label className="block mb-1 font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    value={form.prenom}
                                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                />
                            </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={form.nom}
                                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">City</label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={form.ville}
                                        onChange={(e) => setForm({ ...form, ville: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">Region</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                        value={form.region}
                                        onChange={(e) => setForm({ ...form, region: e.target.value })}
                                    >
                                        <option value="" disabled>Select Location</option>
                                        {regions.map((region, i) => (
                                            <option key={i} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="telephone"
                                        value={form.telephone}
                                        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">experience</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                        value={form.experience}
                                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                    >
                                        <option value="" disabled>Select experience type</option>
                                        {experienceType.map((exp, i) => (
                                            <option key={i} value={exp}>{exp}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-white">niveau scolaire</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                        value={form.niveauScolaire}
                                        onChange={(e) => setForm({ ...form, niveauScolaire: e.target.value })}
                                    >
                                        <option value="" disabled>Select niveau Scolaire</option>
                                        {niveauDetude.map((niv, i) => (
                                            <option key={i} value={niv}>{niv}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                        <div className="mt-8">
                            <div className="flex items-center justify-between my-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experiences</h2>
                                <button
                                    onClick={() => setShowExperienceForm(true)}
                                    type="button"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    Add
                                </button>
                            </div>

                            {experiencesLoading ? (
                                <div>Loading experiences...</div>
                            ) : (
                                <div className="space-y-4">
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{exp.position}</h3>
                                                    <p className="text-blue-600">{exp.societe}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {exp.type_contrat} • {exp.type_lieu}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {exp.dateDebut} - {exp.dateFin || 'Present'}
                                                    </p>
                                                    {exp.description && (
                                                        <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditExperience(exp)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteExperience(exp.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center justify-between my-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                                <button
                                    onClick={() => setShowEducationForm(true)}
                                    type="button"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    Add
                                </button>
                            </div>

                            {diplomasLoading ? (
                                <div>Loading education...</div>
                            ) : (
                                <div className="space-y-4">
                                    {diplomas.map((diploma) => (
                                        <div key={diploma.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{diploma.diplome_titre}</h3>
                                                    <p className="text-blue-600">{diploma.ecole}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{diploma.specialite}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {diploma.dateDebut} - {diploma.dateFin || 'Present'}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditEducation(diploma)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteEducation(diploma.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center justify-between my-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h2>
                                <button
                                    onClick={() => setShowLanguageForm(true)}
                                    type="button"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    Add
                                </button>
                            </div>

                            {languagesLoading ? (
                                <div>Loading languages...</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="font-medium text-gray-900 dark:text-white">{lang.nom_lang}</span>
                                                    <span className="text-gray-500 dark:text-gray-400 ml-2">({lang.niveau})</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditLanguage(lang)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLanguage(lang.id)}
                                                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
            {showExperienceForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-600"
                            onClick={() => setShowExperienceForm(false)}
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add Experience</h3>
                        <form className="space-y-4" onSubmit={handleExperienceSubmit}>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Position *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Software Developer"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={experience.position}
                                    onChange={(e) => setExperience({ ...experience, position: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Contract Type</label>
                                <select
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={experience.type_contrat}
                                    onChange={(e) => setExperience({ ...experience, type_contrat: e.target.value })}
                                >
                                    <option value="">Please select</option>
                                    {contracts.map((contract, i) => (
                                        <option key={i} value={contract}>{contract}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Company *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Google"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={experience.societe}
                                    onChange={(e) => setExperience({ ...experience, societe: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Work Type</label>
                                <select
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={experience.type_lieu}
                                    onChange={(e) => setExperience({ ...experience, type_lieu: e.target.value })}
                                >
                                    <option value="">Please select</option>
                                    <option value="onSite">On Site</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Start Date *</label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={experience.dateDebut}
                                    onChange={(e) => setExperience({ ...experience, dateDebut: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">End Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={experience.dateFin}
                                    onChange={(e) => setExperience({ ...experience, dateFin: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Description</label>
                                <textarea
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    rows="3"
                                    value={experience.description}
                                    onChange={(e) => setExperience({ ...experience, description: e.target.value })}
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEducationForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-600"
                            onClick={() => {
                                setShowEducationForm(false);
                                setEditingEducation(null);
                                setEducation({
                                    ecole: "",
                                    diplome_titre: "",
                                    specialite: "",
                                    dateDebut: "",
                                    dateFin: "",
                                    description: "",
                                });
                            }}
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                            {editingEducation ? 'Edit Education' : 'Add Education'}
                        </h3>
                        <form className="space-y-4" onSubmit={handleEducationSubmit}>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">School *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Harvard University"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={education.ecole}
                                    onChange={(e) => setEducation({ ...education, ecole: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Degree *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Bachelor's Degree"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={education.diplome_titre}
                                    onChange={(e) => setEducation({ ...education, diplome_titre: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Field of Study *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Computer Science"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={education.specialite}
                                    onChange={(e) => setEducation({ ...education, specialite: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Start Date *</label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={education.dateDebut}
                                    onChange={(e) => setEducation({ ...education, dateDebut: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">End Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={education.dateFin}
                                    onChange={(e) => setEducation({ ...education, dateFin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Description</label>
                                <textarea
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    rows="3"
                                    value={education.description}
                                    onChange={(e) => setEducation({ ...education, description: e.target.value })}
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    {editingEducation ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showLanguageForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-600"
                            onClick={() => setShowLanguageForm(false)}
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add Language</h3>
                        <form className="space-y-4" onSubmit={handleLanguageSubmit}>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Language</label>
                                <select
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={language.nom_lang}
                                    onChange={(e) => setLanguage({ ...language, nom_lang: e.target.value })}
                                    required
                                >
                                    <option value="">Please select</option>
                                    {languageOptions.map((lang, i) => (
                                        <option key={i} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1 text-gray-900 dark:text-white">Level</label>
                                <select
                                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                                    value={language.niveau}
                                    onChange={(e) => setLanguage({ ...language, niveau: e.target.value })}
                                    required
                                >
                                    <option value="">Please select</option>
                                    <option value="maternelle">Native</option>
                                    <option value="courant">Fluent</option>
                                    <option value="bon niveau">Good</option>
                                    <option value="intermédiaire">Intermediate</option>
                                    <option value="débutant">Beginner</option>
                                </select>
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditCandidat