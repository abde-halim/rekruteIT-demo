import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Edit3 } from "lucide-react"; // Icon for the header

import Footer from "../../../components/dashboardRecruteur/Footer";
import Navbar from "../../../components/dashboardRecruteur/Navbar";
import Sidebar from "../../../components/dashboardRecruteur/Sidebar";
import { fetchOffreByIdAndRecruteurId, updateOffre } from "../../../features/offreSlice";
import { contracts } from "../../../consts/contractsTypes";
import { experienceType } from "../../../consts/experiences";
import { niveauDetude } from "../../../consts/niveaudetude";

// --- Skeleton Loader for a better UX ---
const FormSkeleton = () => (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
        <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
                <div key={i}>
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            ))}
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex justify-end">
                <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    </div>
);


function EditOffre() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { currentOffre, loading } = useSelector((state) => state.offreSlice);

    const [values, setValues] = useState({
        titre: "",
        experience: "",
        connaissances: "",
        contrat: "",
        formation: "",
        mission: "",
        salaire: "",
        nbr_postes: "",
        specialite: "",
        ville: "",
        add_notes: "",
        datePosted: "",
        description: "",
        languages: "",
    });

    useEffect(() => {
        if (id) {
            dispatch(
                fetchOffreByIdAndRecruteurId({
                    recruteurId: localStorage.getItem("id"),
                    offreId: id,
                })
            );
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentOffre) {
            setValues(currentOffre);
        }
    }, [currentOffre]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(
            updateOffre({
                recruteurId: localStorage.getItem("id"),
                offreId: id,
                offreData: values,
            })
        );
        navigate("/dashboard/recruteur/offres");
    };

    const formInputClasses = "w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
    const formLabelClasses = "block mb-2 font-medium text-gray-700 dark:text-gray-300";

    if (loading && !currentOffre) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar isOpen={true} />
                    <main className="flex-1 p-6">
                        <FormSkeleton />
                    </main>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar isOpen={true} />
                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4 mb-6">

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Modifier l'offre
                            </h2>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className={formLabelClasses}>Titre de l'offre</label>
                                <input name="titre" type="text" value={values.titre || ''} onChange={handleChange} className={formInputClasses} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={formLabelClasses}>Type de contrat</label>
                                    <select name="contrat" value={values.contrat || ''} onChange={handleChange} className={formInputClasses}>
                                        {contracts.map((contract, i) => (
                                            <option key={i} value={contract}>{contract}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={formLabelClasses}>Postes disponibles</label>
                                    <input name="nbr_postes" type="number" min="1" value={values.nbr_postes || ''} onChange={handleChange} className={formInputClasses} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={formLabelClasses}>Ville</label>
                                    <input name="ville" type="text" value={values.ville || ''} onChange={handleChange} className={formInputClasses} />
                                </div>
                                <div>
                                    <label className={formLabelClasses}>Spécialité</label>
                                    <input name="specialite" type="text" value={values.specialite || ''} onChange={handleChange} className={formInputClasses} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={formLabelClasses}>Expérience Requise</label>
                                    <select name="experience" value={values.experience || ''} onChange={handleChange} className={formInputClasses}>
                                        <option value="">-- Sélectionnez une expérience --</option>
                                        {experienceType.map((exp, i) => (
                                            <option key={i} value={exp}>{exp}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={formLabelClasses}>Salaire (Optionnel)</label>
                                    <input name="salaire" type="text" placeholder="Ex: 5000 MAD/mois" value={values.salaire || ''} onChange={handleChange} className={formInputClasses} />
                                </div>
                            </div>

                            <div>
                                <label className={formLabelClasses}>Niveau de formation</label>
                                <select name="formation" value={values.formation || ''} onChange={handleChange} className={formInputClasses}>
                                    <option value="">-- Sélectionnez un niveau --</option>
                                    {niveauDetude.map((niv, i) => (
                                        <option key={i} value={niv}>{niv}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={formLabelClasses}>Compétences requises (séparées par des virgules)</label>
                                <input name="connaissances" type="text" value={values.connaissances || ''} onChange={handleChange} className={formInputClasses} />
                            </div>

                            <div>
                                <label className={formLabelClasses}>Langues (séparées par des virgules)</label>
                                <input name="languages" type="text" value={values.languages || ''} onChange={handleChange} className={formInputClasses} />
                            </div>

                            <div>
                                <label className={formLabelClasses}>Description du poste</label>
                                <textarea name="description" value={values.description || ''} onChange={handleChange} className={`${formInputClasses} h-32 resize-y`} />
                            </div>

                            <div>
                                <label className={formLabelClasses}>Missions principales</label>
                                <textarea name="mission" value={values.mission || ''} onChange={handleChange} className={`${formInputClasses} h-24 resize-y`} />
                            </div>

                            <div>
                                <label className={formLabelClasses}>Notes supplémentaires (Optionnel)</label>
                                <textarea name="add_notes" value={values.add_notes || ''} onChange={handleChange} className={`${formInputClasses} h-20 resize-y`} />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sauvegarde...' : 'Enregistrer les modifications'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default EditOffre;