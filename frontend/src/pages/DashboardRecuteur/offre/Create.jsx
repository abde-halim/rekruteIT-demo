import React, { useState } from "react";
import Footer from "../../../components/dashboardRecruteur/Footer";
import Navbar from "../../../components/dashboardRecruteur/Navbar";
import Sidebar from "../../../components/dashboardRecruteur/Sidebar";
import { useDispatch } from "react-redux";
import { createOffre } from "../../../features/offreSlice";
import { useNavigate } from "react-router-dom";
import { contracts } from "../../../consts/contractsTypes";
import { experienceType } from "../../../consts/experiences";
import { niveauDetude } from "../../../consts/niveaudetude";
import { regions } from "../../../consts/regions";

export default function AjouterOffre() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        region: ""
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createOffre({
            recruteurId: localStorage.getItem("id"),
            offreData: values
        }));
        navigate("/offreRecruteur");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar isOpen={true} />
                <main className="flex-1 p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-indigo-900 dark:text-white">
                        Ajouter une nouvelle offre
                    </h1>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow p-6 border border-indigo-100 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Titre d'offre
                                </label>
                                <input
                                    name="titre"
                                    type="text"
                                    value={values.titre}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        Type de contrat
                                    </label>
                                    <select
                                        name="contrat"
                                        value={values.contrat}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        {contracts.map((contract, index) => (
                                            <option key={index} value={contract}>{contract}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        Postes disponibles
                                    </label>
                                    <input
                                        name="nbr_postes"
                                        type="number"
                                        value={values.nbr_postes}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        Ville
                                    </label>
                                    <input
                                        name="ville"
                                        type="text"
                                        value={values.ville}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        region
                                    </label>
                                    <select
                                        name="region"
                                        value={values.region}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        {regions.map((exp, index) => (
                                            <option key={index} value={exp}>{exp}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        Spécialité
                                    </label>
                                    <input
                                        name="specialite"
                                        type="text"
                                        value={values.specialite}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        Années d'expérience
                                    </label>
                                    <select
                                        name="experience"
                                        value={values.experience}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        {experienceType.map((exp, index) => (
                                            <option key={index} value={exp}>{exp}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                        Salaire
                                    </label>
                                    <input
                                        name="salaire"
                                        type="text"
                                        value={values.salaire}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Niveau d'éducation
                                </label>
                                <select
                                    name="formation"
                                    value={values.formation}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    {niveauDetude.map((niv, index) => (
                                        <option key={index} value={niv}>{niv}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Compétences requises
                                </label>
                                <input
                                    name="connaissances"
                                    type="text"
                                    value={values.connaissances}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Langues
                                </label>
                                <input
                                    name="languages"
                                    type="text"
                                    value={values.languages}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 dark:border-gray-600 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Description de l'offre
                                </label>
                                <textarea
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    className="w-full h-32 p-3 border resize-none rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-indigo-300 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Mission
                                </label>
                                <textarea
                                    name="mission"
                                    value={values.mission}
                                    onChange={handleChange}
                                    className="w-full h-24 p-3 border resize-none rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-indigo-300 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold text-indigo-800 dark:text-gray-100">
                                    Notes supplémentaires
                                </label>
                                <textarea
                                    name="add_notes"
                                    value={values.add_notes}
                                    onChange={handleChange}
                                    className="w-full h-20 p-3 border resize-none rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-indigo-300 dark:border-gray-600"
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
                                >
                                    Publier l'offre
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
