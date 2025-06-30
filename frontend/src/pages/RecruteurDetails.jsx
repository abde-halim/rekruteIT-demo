import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruteurById } from "../features/recruteurSlice";
import { fetchOffresByRecruteur } from "../features/offreSlice";
import { MapPin, Mail, Phone, Globe, Briefcase, Clock } from "lucide-react";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer"; // Added Footer for consistency

function RecruteurDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const {
        currentRecruteur,
        loading: recruteurLoading,
        error: recruteurError,
    } = useSelector((state) => state.recruteurSlice);

    const {
        offres,
        loading: offresLoading,
        error: offresError,
    } = useSelector((state) => state.offreSlice);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecruteurById(id));
            dispatch(fetchOffresByRecruteur(id));
        }
    }, [dispatch, id]);

    const renderContent = () => {
        if (recruteurLoading || offresLoading) {
            return (
                <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                </div>
            );
        }

        if (recruteurError || offresError) {
            return (
                <div className="flex-1 flex justify-center items-center text-red-500 dark:text-red-400">
                    <p>{recruteurError || offresError}</p>
                </div>
            );
        }

        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: "url('/pics/banner-placeholder.jpg')" }}></div>

                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-24 sm:-mt-20">
                            <img
                                src={currentRecruteur?.image || "/pics/company.avif"}
                                alt="Company Logo"
                                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                            />
                            <div className="mt-4 sm:ml-6 text-center sm:text-left">
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                    {currentRecruteur?.nomSociete || "Unknown Company"}
                                </h1>
                                <p className="text-md text-gray-600 dark:text-gray-400">
                                    {currentRecruteur?.ville || "Unknown Location"}
                                </p>
                            </div>
                        </div>

                        {currentRecruteur?.description && (
                            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                                {currentRecruteur.description}
                            </p>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300">{currentRecruteur?.region || "Region not specified"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500" />
                                <a href={`mailto:${currentRecruteur?.email}`} className="text-blue-600 hover:underline">{currentRecruteur?.email || "No email"}</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300">{currentRecruteur?.telephone || "No phone"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-blue-500" />
                                <a href={currentRecruteur?.siteWeb} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                                    {currentRecruteur?.siteWeb || "No website"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Offers ({offres?.length || 0})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {offres?.map((offre) => (
                        <div
                            key={offre.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{offre.titre}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 mb-4 line-clamp-3">
                                {offre.description}
                            </p>
                            <div className="space-y-3 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
                                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Briefcase size={16} className="text-blue-500" /> Contrat: {offre.contrat}</p>
                                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><MapPin size={16} className="text-blue-500" /> Location: {offre.ville}</p>
                                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Clock size={16} className="text-blue-500" /> Published: {offre.datePosted}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/offres/${offre.id}`, { state: { offre } })}
                                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md"
                            >
                                Voire offre
                            </button>
                        </div>
                    ))}
                </div>
                {offres?.length === 0 && (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <p className="text-gray-500 dark:text-gray-400">This recruiter has no open positions at the moment.</p>
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

export default RecruteurDetails;