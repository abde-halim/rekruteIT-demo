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

    const { currentOffre, loading, error } = useSelector((state) => state.offreSlice);

    const [showToast, setShowToast] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    useEffect(() => {
        console.log(id);
        if (id) {
            dispatch(fetchOffreById(id));
        }
    }, [dispatch, id]);

    const handleApplicationClick = () => {
        setShowApplicationModal(true);
    };

    const handleConfirmApplication = async () => {
        try {
            setApplicationConfirmed(true);
            setShowApplicationModal(false);
            await dispatch(createCandidature({
                "candidatId": localStorage.getItem("id"),
                "offreId": id
            }));

            setTimeout(() => {
                setApplicationConfirmed(false);
                navigate("/offres");
            }, 3000);

        } catch (error) {
            setApplicationConfirmed(false);
            setShowApplicationModal(false);
            console.error("Error submitting application:", error);
        }
    };

    const handleCancelApplication = () => {
        setShowApplicationModal(false);
    };

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!currentOffre) return <p className="text-center mt-10 text-gray-500">Offre introuvable.</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            {showToast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
                    Link copied to clipboard!
                </div>
            )}
            <main className="flex-grow overflow-auto px-6 py-8">
                <div className="flex justify-center gap-4 mb-10">
                    <button className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                        Voir l'entreprise
                    </button>
                    <button
                        className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                        onClick={handleCopyLink}
                    >
                        Copier le lien
                    </button>
                    {localStorage.getItem("role") === "ROLE_CANDIDAT" && <button onClick={handleApplicationClick} className="text-sm px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
                        Postuler
                    </button>}
                </div>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-4 text-gray-800">

                    <div className="flex justify-between"><h1 className="text-2xl font-bold text-gray-800 text-center">{currentOffre.titre}</h1>
                        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline text-sm">
                            ← Retour
                        </button></div>
                    <p><span className="font-semibold">Description:</span><br />{currentOffre.description}</p>
                    <p><span className="font-semibold">Ville:</span> {currentOffre.ville}</p>
                    <p><span className="font-semibold">Date de publication:</span> {new Date(currentOffre.datePosted).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Type de contrat:</span> {currentOffre.contrat}</p>
                    <p><span className="font-semibold">Expérience requise:</span> {currentOffre.annees_experience} ans</p>
                    <p><span className="font-semibold">Salaire:</span> {currentOffre.salaire} MAD</p>
                    <p><span className="font-semibold">Nombre de postes:</span> {currentOffre.nbr_postes}</p>
                    <p><span className="font-semibold">Formation:</span> {currentOffre.formation}</p>
                    <p><span className="font-semibold">Spécialité:</span> {currentOffre.specialite}</p>
                    <p><span className="font-semibold">Langues:</span> {currentOffre.languages}</p>
                    <p><span className="font-semibold">Connaissances techniques:</span> {currentOffre.connaissances}</p>
                    <p><span className="font-semibold">Mission:</span> {currentOffre.mission}</p>
                    <p><span className="font-semibold">Notes supplémentaires:</span> {currentOffre.add_notes}</p>
                </div>
            </main>

            {showApplicationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full text-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmer la candidature</h2>
                        <p className="mb-6 text-gray-600">Êtes-vous sûr de vouloir postuler pour ce poste ?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleCancelApplication}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors text-white"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleConfirmApplication}
                                className="px-4 py-2 rounded bg-[#514BEE] hover:bg-[#3e39c9] transition-colors text-white"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {applicationConfirmed && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
                    <p className="font-semibold">✓ Candidature envoyée avec succès !</p>
                </div>
            )}
        </div>
    );
};

export default JobDetails;