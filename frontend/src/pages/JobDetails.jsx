import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOffreById } from "../features/offreSlice";
import { createCandidature } from "../features/candidatureSlice";
import Navbar from "../components/LandingPage/Navbar";

const JobDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [applicationConfirmed, setApplicationConfirmed] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const { currentOffre, loading, error } = useSelector((state) => state.offreSlice);

    useEffect(() => {
        if (id) {
            dispatch(fetchOffreById(id));
        }
    }, [dispatch, id]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleApplicationClick = () => {
        setShowApplicationModal(true);
    };

    const handleConfirmApplication = async () => {
        try {
            setApplicationConfirmed(true);
            setShowApplicationModal(false);
            await dispatch(createCandidature({
                candidatId: localStorage.getItem("id"),
                offreId: id,
            }));
            setTimeout(() => {
                setApplicationConfirmed(false);
                navigate("/offres");
            }, 3000);
        } catch (error) {
            setApplicationConfirmed(false);
            setShowApplicationModal(false);
            console.error("Erreur candidature:", error);
        }
    };

    const handleCancelApplication = () => {
        setShowApplicationModal(false);
    };

    if (loading) return <p className="text-center mt-10 text-indigo-600">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!currentOffre) return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">Offre introuvable.</p>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Navbar />

            {showToast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity">
                    Lien copié dans le presse-papiers !
                </div>
            )}

            <main className="flex-grow px-6 py-8">
                <div className="flex justify-center gap-4 mb-10">
                    <button className="text-sm px-4 py-2 border border-indigo-300 dark:border-gray-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition">
                        Voir l'entreprise
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="text-sm px-4 py-2 border border-indigo-300 dark:border-gray-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                    >
                        Copier le lien
                    </button>
                    {localStorage.getItem("role") === "ROLE_CANDIDAT" && (
                        <button
                            onClick={handleApplicationClick}
                            className="text-sm px-4 py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-800 transition"
                        >
                            Postuler
                        </button>
                    )}
                </div>

                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow space-y-4">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-bold text-indigo-900 dark:text-white">{currentOffre.titre}</h1>
                        <button onClick={() => navigate(-1)} className="text-indigo-600 hover:underline text-sm">
                            ← Retour
                        </button>
                    </div>

                    <div className="space-y-3 text-sm md:text-base">
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Description:</span><br />{currentOffre.description}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Ville:</span> {currentOffre.ville}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Date de publication:</span> {new Date(currentOffre.datePosted).toLocaleDateString()}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Type de contrat:</span> {currentOffre.contrat}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Expérience requise:</span> {!currentOffre.experience ? "pas montionée" : currentOffre.experience}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Salaire:</span> {currentOffre.salaire} MAD</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Nombre de postes:</span> {currentOffre.nbr_postes}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Formation:</span> {currentOffre.formation}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Spécialité:</span> {currentOffre.specialite}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Langues:</span> {currentOffre.languages}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Connaissances techniques:</span> {currentOffre.connaissances}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Mission:</span> {currentOffre.mission}</p>
                        <p><span className="font-semibold text-indigo-800 dark:text-indigo-300">Notes supplémentaires:</span> {currentOffre.add_notes}</p>
                    </div>
                </div>
            </main>
            {showApplicationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 max-w-full text-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            Confirmer la candidature
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            Êtes-vous sûr de vouloir postuler pour ce poste ?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleCancelApplication}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleConfirmApplication}
                                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {applicationConfirmed && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
                    ✓ Candidature envoyée avec succès !
                </div>
            )}
        </div>
    );
};

export default JobDetails;
