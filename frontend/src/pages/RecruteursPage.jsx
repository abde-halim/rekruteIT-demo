import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecruteur } from "../features/recruteurSlice";
import { FaLocationDot } from "react-icons/fa6";
import { RiFileInfoLine } from "react-icons/ri";
import Navbar from "../components/LandingPage/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/LandingPage/Footer";
function RecruteursPage() {
    const dispatch = useDispatch();
    const {
        recruteurResponse,
        loading,
        error
    } = useSelector((state) => state.recruteurSlice);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [sortBy] = useState('userId');
    const [sortDir] = useState('asc');

    useEffect(() => {
        dispatch(fetchAllRecruteur({
            pageNo: currentPage - 1,
            pageSize,
            sortBy,
            sortDir,
        }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(clearError());
            }
        };
    }, [dispatch, error]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des recruteurs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Erreur: {error}</p>
                    <button
                        onClick={() => dispatch(fetchAllRecruteur({ pageNo: currentPage - 1, pageSize, sortBy, sortDir }))}
                        className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-6 sm:p-10 bg-white">
                <div className="text-4xl font-extrabold text-gray-900 mb-8">
                    Recruteurs ({recruteurResponse?.totalElements || 0})
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {recruteurResponse?.content?.map((recruteur, index) => (
                        <div
                            key={recruteur.id || index}
                            className="border p-5 rounded-2xl hover:bg-blue-50 transition-colors duration-200 shadow-sm"
                        >
                            <h2 className="text-2xl font-bold text-gray-800">{recruteur.nomSociete || "Entreprise inconnue"}</h2>
                            <div className="flex gap-5 py-2 text-gray-600">
                                <p><FaLocationDot className="inline mr-1" /> {recruteur.ville || "Ville inconnue"}</p>
                                <p><RiFileInfoLine className="inline mr-1" /> {recruteur.telephone || "telephone non spécifié"}</p>
                            </div>
                            {recruteur.description && (
                                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                    {recruteur.description.substring(0, 150)}...
                                </p>
                            )}
                            <button
                                className="mt-4 bg-[#514BEE] hover:bg-[#3e39c9] transition duration-200 text-white font-semibold px-5 py-2 rounded-full shadow-md"
                            >
                                <Link to={`/recruteurs/${recruteur.userId}`}>Voir le profil</Link>
                            </button>
                        </div>
                    ))}
                </div>

                {recruteurResponse?.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                            Précédent
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: recruteurResponse.totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1
                                        ? 'bg-red-700 text-white'
                                        : 'border hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === recruteurResponse.totalPages || loading}
                            className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default RecruteursPage;
