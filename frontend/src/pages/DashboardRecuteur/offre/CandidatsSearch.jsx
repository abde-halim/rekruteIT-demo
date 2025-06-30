import { Calendar, Clock, Eye, MoreVertical, Building2, MapPin } from "lucide-react";
import Footer from "../../../components/dashboardRecruteur/Footer";
import Sidebar from "../../../components/dashboardRecruteur/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/dashboardRecruteur/Navbar";
import { aiMatches } from "../../../features/AiSlice";
function CandidatsSearch() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const { data, isLoading, error } = useSelector((state) => state.AiSlice);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const result = await dispatch(aiMatches(id));
                console.log("Fetched candidatures:", result.payload);
            } catch (err) {
                console.error('Error fetching candidatures:', err);
            }
        };
        fetchApplications();
    }, [dispatch]);
    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar isOpen={true} />
                    <main className="flex-1 p-6 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300">Chargement de vos candidats...</p>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar isOpen={true} />
                <main className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Candidats trouvés
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Suivez l'état des candidats trouvés
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.length || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                            <p className="font-medium">Erreur de chargement</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data && data.length > 0 ? (
                                data?.map((candidat) => (
                                    <div key={candidat.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                                                        <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {candidat.nom} {candidat.prenom}
                                                        </h3>
                                                    </div>
                                                </div>


                                                {candidat.percent !== null && (
                                                    <div className="w-full mt-2">
                                                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                            <span>Match: {Math.round(candidat.percent)}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                            <div
                                                                className="bg-green-500 h-2.5 rounded-full"
                                                                style={{ width: `${candidat.percent}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => navigate(`/ِcandidat/${candidat.candidatId}`)}
                                                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium hover:underline"
                                                    >
                                                        Voir le profile →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Aucune candidat pour le moment
                                    </h3>
                                    <button
                                        onClick={() => navigate('/offres')}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        Parcourir les offres
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default CandidatsSearch