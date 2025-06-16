import React, { useState } from "react";
import Footer from "../../../components/dashboardRecruteur/Footer";
import Navbar from "../../../components/dashboardRecruteur/Navbar";
import Sidebar from "../../../components/dashboardRecruteur/Sidebar";
import { useDispatch } from "react-redux";
import { createOffre } from "../../../features/offreSlice";
import { useNavigate } from "react-router-dom";
import { contracts } from "../../../consts/contractsTypes";

function AjouterOffre() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const [values, setValues] = useState({
        titre: "",
        annees_experience: "",
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
        languages: ""
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(createOffre({ recruteurId: localStorage.getItem("id"), offreData: values }))
        Navigate("/offreRecruteur")

    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar isOpen={true} />
                <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center">
                    <div className="w-full bg-white rounded-lg shadow p-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-1 font-medium">titre d'offre</label>
                                <input
                                    name="titre"
                                    type="text"
                                    value={values.titre}
                                    onChange={handleChange}
                                    className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium">Type de contrat</label>
                                    <select
                                        name="contrat"
                                        value={values.contrat}
                                        onChange={handleChange}
                                        className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                    >
                                        {contracts.map((contract) => (
                                            <option value={contract}>{contract}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium">Postes disponibles</label>
                                    <input
                                        name="nbr_postes"
                                        type="text"
                                        value={values.nbr_postes}
                                        onChange={handleChange}
                                        className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium">ville</label>
                                    <input
                                        name="ville"
                                        type="text"
                                        value={values.ville}
                                        onChange={handleChange}
                                        className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium">Spécialité</label>
                                    <input
                                        name="specialite"
                                        type="text"
                                        value={values.specialite}
                                        onChange={handleChange}
                                        className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium">Experience (ans)</label>
                                    <input
                                        name="annees_experience"
                                        type="text"
                                        value={values.annees_experience}
                                        onChange={handleChange}
                                        className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1 font-medium">Salaire</label>
                                    <input
                                        name="salaire"
                                        type="text"
                                        value={values.salaire}
                                        onChange={handleChange}
                                        className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Niveau d'éducation</label>
                                <input
                                    name="formation"
                                    type="text"
                                    value={values.formation}
                                    onChange={handleChange}
                                    className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Compétences requises</label>
                                <input
                                    name="connaissances"
                                    type="text"
                                    value={values.connaissances}
                                    onChange={handleChange}
                                    className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Languages</label>
                                <input
                                    name="languages"
                                    type="text"
                                    value={values.languages}
                                    onChange={handleChange}
                                    className="w-full input-style p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-semibold">Description d'offre</label>
                                <textarea
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    className="w-full input-style h-32 resize-none p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Mission</label>
                                <textarea
                                    name="mission"
                                    value={values.mission}
                                    onChange={handleChange}
                                    className="w-full input-style h-24 resize-none p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Additional Notes</label>
                                <textarea
                                    name="add_notes"
                                    value={values.add_notes}
                                    onChange={handleChange}
                                    className="w-full input-style h-20 resize-none p-3 border border-b-gray-100 rounded-2xl my-1"
                                />
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AjouterOffre;
