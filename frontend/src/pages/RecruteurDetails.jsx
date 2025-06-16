import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruteurById } from "../features/recruteurSlice";
import { fetchOffresByRecruteur } from "../features/offreSlice";
import { FaLocationDot } from "react-icons/fa6";
import { RiFileInfoLine } from "react-icons/ri";
import Navbar from "../components/LandingPage/Navbar";
import { fetchCandidateById } from "../features/candidatSlice";

function RecruteurDetails() {
    const Navigate = useNavigate()
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
            dispatch(fetchOffresByRecruteur(id))
        }
    }, [dispatch, id]);

    if (recruteurLoading || offresLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (recruteurError || offresError) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-600">
                <p>{recruteurError || offresError}</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen p-8 bg-gray-50">
                <div className="bg-white shadow-md p-6 rounded-2xl mb-8 flex justify-between items-start gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {currentRecruteur?.nomSociete || "Société inconnue"}
                        </h1>

                        <div className="space-y-2 text-gray-700">
                            <p>
                                <span className="font-semibold">Ville:</span>{" "}
                                {currentRecruteur?.ville || "Ville inconnue"}
                            </p>
                            <p>
                                <span className="font-semibold">Région:</span>{" "}
                                {currentRecruteur?.region || "Région inconnue"}
                            </p>
                            <p>
                                <span className="font-semibold">Site Web:</span>{" "}
                                {currentRecruteur?.siteWeb || "Non disponible"}
                            </p>
                            <p>
                                <span className="font-semibold">Téléphone:</span>{" "}
                                {currentRecruteur?.telephone || "Non disponible"}
                            </p>
                        </div>

                        {currentRecruteur?.description && (
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                {currentRecruteur.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <img
                            src={
                                currentRecruteur?.logo
                                    ? `/uploads/${currentRecruteur.logo}`
                                    : "/pics/company.avif"
                            }
                            alt="Logo de l'entreprise"
                            className="w-48 h-auto rounded-xl object-contain shadow-sm"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Offres publiées ({offres?.length || 0})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {offres?.map((offre) => (
                        <div
                            key={offre.id}
                            className="bg-white border p-5 rounded-2xl hover:bg-blue-50 transition-colors duration-200 shadow"
                        >
                            <h3 className="text-xl font-bold text-gray-900">{offre.titre}</h3>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                {offre.description?.substring(0, 150)}...
                            </p>
                            <p className="mt-2 text-sm text-gray-500">Contrat: {offre.typeContrat}</p>
                            <p className="text-sm text-gray-500">Lieu: {offre.ville}</p>
                            <button

                                onClick={() => Navigate(`/offres/${offre.id}`, { state: { offre } })}

                                className="mt-4 bg-[#514BEE] hover:bg-[#3e39c9] transition duration-200 text-white font-semibold px-5 py-2 rounded-full shadow"
                            >
                                Voir Offre
                            </button>
                        </div>
                    ))}
                </div>
            </div></>
    );
}

export default RecruteurDetails;
