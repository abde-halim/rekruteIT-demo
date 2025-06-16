import { Bookmark, CheckCircle, User, MapPin, Mail, Phone, GraduationCap, Briefcase, Globe, Edit, Calendar } from "lucide-react";
import Footer from "../../components/dashboardCandidat/Footer";
import Navbar from "../../components/dashboardCandidat/Navbar";
import Sidebar from "../../components/dashboardCandidat/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCandidateById } from "../../features/candidatSlice";
import { fetchLanguagesByCandidate } from "../../features/languageSlice";
import { fetchExperiences } from "../../features/experienceSlice";
import { fetchDiplomesByCandidate } from "../../features/diplomeSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});
  const { data: candidateData, loading: candidateLoading, error: candidateError, user } = useSelector((state) => state.candidateSlice);
  const { list: diplomes, loading: diplomesLoading } = useSelector((state) => state.diplomesSlice);
  const { list: experiences, loading: experiencesLoading } = useSelector((state) => state.experienceSlice);
  const { list: languages, loading: languagesLoading } = useSelector((state) => state.languageSlice);

  useEffect(() => {
    const fetchAllData = async () => {
      const candidateId = localStorage.getItem("id");

      try {
        await dispatch(fetchCandidateById(candidateId));
      } catch (err) {
        toast.error('Error fetching profile data');
      }
    };
    fetchAllData();
  }, [dispatch]);

  const isLoading = candidateLoading || diplomesLoading || experiencesLoading || languagesLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar isOpen={true} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">Loading profile...</p>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={true} />

        <main className="flex-1 p-6 space-y-8 ">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden pt-20">
            <div className="bg-gray-600"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end -mt-16 relative">
                <div className="relative">
                  <img
                    src={candidateData?.image ? `${candidateData.image}` : '/pics/cercle-bleu-utilisateur-blanc_78370-4707.avif'}

                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
                <div className="mt-4 lg:mt-0 lg:ml-6 flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{candidateData?.nom + " " + candidateData?.prenom || 'User Name'}</h1>
                  <p className="text-blue-600 font-medium text-lg mt-1"></p>
                  <div className="flex flex-wrap gap-6 mt-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{candidateData?.ville}, {candidateData?.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{candidateData?.telephone}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/profile/edit"
                  className="mt-4 lg:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-md"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                <p className="text-gray-600 dark:text-gray-300">Academic background and qualifications</p>
              </div>
            </div>

            <div className="space-y-6">
              {candidateData?.diplomes && candidateData?.diplomes.length > 0 ? (
                candidateData?.diplomes.map((edu, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {edu.ecole || edu.institution}
                        </h3>
                        <p className="text-blue-600  font-medium mb-2">
                          {edu.diplome_titre} {edu.specialite && `- ${edu.specialite}`}
                        </p>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.dateDebut} - {edu.dateFin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No education records found</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Experience</h2>
                <p className="text-gray-600 dark:text-gray-300">Work history and accomplishments</p>
              </div>
            </div>

            <div className="space-y-6">
              {candidateData?.experiences && candidateData?.experiences.length > 0 ? (
                candidateData?.experiences.map((exp, index) => {
                  const maxChars = 150;
                  const isLong = exp.description?.length > maxChars;
                  const showFull = expanded[index] || false;
                  const shortDesc = exp.description?.slice(0, maxChars) + "...";

                  return (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {exp.poste || exp.position}
                          </h3>
                          <p className="text-blue-600  font-medium text-lg">
                            {exp.societe || exp.company}
                          </p>
                        </div>
                        <div className="text-right text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.dateDebut} - {exp.dateFin}</span>
                          </div>
                          <p className="text-sm">
                            {exp.type_lieu} | {exp.type_contrat}
                          </p>
                        </div>
                      </div>

                      {exp.description && (
                        <div className="text-gray-700 dark:text-gray-300">
                          {isLong ? (
                            <>
                              {showFull ? exp.description : shortDesc}
                              <button
                                className="text-blue-600 underline ml-1 font-medium"
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
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No work experience found</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
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
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                        {lang.nom_lang || lang.language}
                      </h3>
                      <span className="px-3 py-1  bg-blue-600  rounded-full text-sm font-medium capitalize">
                        {lang.niveau || lang.level}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No languages specified</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}