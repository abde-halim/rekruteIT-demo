import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecruteur, clearError } from "../features/recruteurSlice";
import { Building2, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";
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
    }, [dispatch, currentPage, pageSize, sortBy, sortDir]);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(clearError());
            }
        };
    }, [dispatch, error]);

    const renderContent = () => {
        if (loading && !recruteurResponse?.content) {
            return (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Loading Recruiters...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
                        <button
                            onClick={() => dispatch(fetchAllRecruteur({ pageNo: currentPage - 1, pageSize, sortBy, sortDir }))}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        Find Recruiters
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                        Explore companies and recruiters ({recruteurResponse?.totalElements || 0} found)
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {recruteurResponse?.content?.map((recruteur) => (
                        <div
                            key={recruteur.userId}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            <div className="p-6 flex-grow">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={recruteur.logo || './pics/cercle-bleu-utilisateur-blanc_78370-4707.avif'}
                                        alt={`${recruteur.nomSociete} logo`}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {recruteur.nomSociete || "Unknown Company"}
                                        </h2>
                                        <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                            <span>{recruteur.ville || "Unknown Location"}</span>
                                        </div>
                                    </div>
                                </div>

                                {recruteur.description && (
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                                        {recruteur.description}
                                    </p>
                                )}

                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                    <span>{recruteur.telephone || "No phone number"}</span>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                                <Link to={`/recruteurs/${recruteur.userId}`}>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md">
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {recruteurResponse?.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-12">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>

                        <div className="flex items-center gap-1 sm:gap-2">
                            {Array.from({ length: recruteurResponse.totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === recruteurResponse.totalPages || loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="flex-1 flex flex-col">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
}

export default RecruteursPage;