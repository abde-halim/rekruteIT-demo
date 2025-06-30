import {
    Bookmark,
    CheckCircle,
    User,
    MapPin,
    Mail,
    Phone,
    GraduationCap,
    Briefcase,
    Globe,
    Edit,
    Calendar,
    Award,
    Languages,
    Building,
    Clock,
    UserCheck
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCandidateById } from "../features/candidatSlice";
import { fetchDiplomesByCandidate } from "../features/diplomeSlice";
import { fetchExperiences } from "../features/experienceSlice";
import { fetchLanguagesByCandidate } from "../features/languageSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState({});
    const { data: candidateData, loading: candidateLoading, error: candidateError, user } = useSelector((state) => state.candidateSlice);
    const { id } = useParams();

    useEffect(() => {
        const fetchAllData = async () => {

            try {
                await dispatch(fetchCandidateById(id));
            } catch (err) {
                toast.error('Error fetching profile data');
            }
        };

        fetchAllData();
    }, [dispatch]);

    const isLoading = candidateLoading;

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="flex flex-1">
                    <main className="flex-1 p-6 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto"></div>
                            <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg">Loading your profile...</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Please wait while we fetch your information</p>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-1">
                <main className="flex-1 p-6 space-y-8 max-w-6xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 h-32 relative">
                            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                        </div>
                        <div className="px-8 pb-8">
                            <div className="flex flex-col lg:flex-row items-start lg:items-end -mt-16 relative">
                                <div className="relative">
                                    <img
                                        src={candidateData?.image ? candidateData?.image : "/public/pics/cercle-bleu-utilisateur-blanc_78370-4707.avif"}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                                    />
                                </div>

                                <div className="mt-4 lg:mt-0 lg:ml-6 flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {candidateData?.nom + " " + candidateData?.prenom || 'User Name'}
                                    </h1>
                                    <div className="flex flex-wrap gap-6 mt-4 text-gray-600 dark:text-gray-300">
                                        {candidateData?.ville && candidateData?.region && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-blue-50" />
                                                <span>{candidateData.ville}, {candidateData.region}</span>
                                            </div>
                                        )}
                                        {candidateData?.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-blue-50" />
                                                <span>{candidateData.email}</span>
                                            </div>
                                        )}
                                        {candidateData?.telephone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-blue-50" />
                                                <span>{candidateData.telephone}</span>
                                            </div>
                                        )}
                                        {candidateData?.experience && (
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-blue-50" />
                                                <span className="capitalize">{candidateData.experience}</span>
                                            </div>
                                        )}

                                        {candidateData?.niveauScolaire && (
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4 text-blue-50" />
                                                <span className="capitalize">{candidateData.niveauScolaire}</span>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <GraduationCap className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">Education</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {candidateData?.diplomes?.length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Qualifications</p>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Briefcase className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">Experience</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {candidateData?.experiences?.length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Positions</p>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Languages className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">Languages</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {candidateData?.languages?.length || 0}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Spoken</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <GraduationCap className="w-6 h-6 text-blue-50" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                                <p className="text-gray-600 dark:text-gray-300">Academic background and qualifications</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {candidateData?.diplomes && candidateData?.diplomes.length > 0 ? (
                                candidateData?.diplomes?.map((edu, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg">
                                                        <Award className="w-5 h-5 text-blue-50" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                            {edu.ecole || edu.institution || 'Institution Name'}
                                                        </h3>
                                                        <p className="text-blue-50 font-medium mb-2">
                                                            {edu.diplome_titre} {edu.specialite && `- ${edu.specialite}`}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(edu.dateDebut)} - {formatDate(edu.dateFin)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg">No education records found</p>
                                    <p className="text-sm">Add your educational background to showcase your qualifications</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="w-6 h-6 text-blue-50" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Experience</h2>
                                <p className="text-gray-600 dark:text-gray-300">Work history and accomplishments</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {candidateData?.experiences && candidateData?.experiences.length > 0 ? (
                                candidateData?.experiences.map((exp, index) => {
                                    const maxChars = 200;
                                    const isLong = exp.description?.length > maxChars;
                                    const showFull = expanded[index] || false;
                                    const shortDesc = exp.description?.slice(0, maxChars) + "...";

                                    return (
                                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <div className="flex items-start gap-4">
                                                <div className="text-blue-50 p-2 rounded-lg flex-shrink-0">
                                                    <Building className="w-5 h-5 text-blue-50" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                                {exp.poste || exp.position || 'Position Title'}
                                                            </h3>
                                                            <p className="text-blue-50  font-medium text-lg">
                                                                {exp.societe || exp.company || 'Company Name'}
                                                            </p>
                                                        </div>
                                                        <div className="text-right text-gray-600 dark:text-gray-300">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>{formatDate(exp.dateDebut)} - {formatDate(exp.dateFin)}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 justify-end">
                                                                {exp.type_lieu && (
                                                                    <span className="px-2 py-1  text-xs font-medium">
                                                                        {exp.type_lieu}
                                                                    </span>
                                                                )}
                                                                {exp.type_contrat && (
                                                                    <span className="px-2 py-1 text-xs font-medium">
                                                                        {exp.type_contrat}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {exp.description && (
                                                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                            {isLong ? (
                                                                <>
                                                                    {showFull ? exp.description : shortDesc}
                                                                    <button
                                                                        className="text-blue-50 underline ml-1 font-medium"
                                                                        onClick={() =>
                                                                            setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
                                                                        }
                                                                    >
                                                                        {showFull ? "Show less" : "Show more"}
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                exp.description
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg">No work experience found</p>
                                    <p className="text-sm">Add your professional experience to showcase your career journey</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Languages className="w-6 h-6 text-blue-50" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h2>
                                <p className="text-gray-600 dark:text-gray-300">Language skills and proficiency levels</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {candidateData?.languages && candidateData?.languages.length > 0 ? (
                                candidateData?.languages.map((lang, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className=" p-2 rounded-lg">
                                                    <Globe className="w-4 h-4 text-blue-50" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                                                    {lang.nom_lang || lang.language || 'Language'}
                                                </h3>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize text-blue-50`}>
                                                {lang.niveau || lang.level || 'Basic'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Languages className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg">No languages specified</p>
                                    <p className="text-sm">Add your language skills to showcase your communication abilities</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}