import { Calendar, Clock, Eye, MoreVertical, Building2, MapPin } from "lucide-react";
import Footer from "../../components/dashboardCandidat/Footer";
import Navbar from "../../components/dashboardCandidat/Navbar";
import Sidebar from "../../components/dashboardCandidat/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCandidaturesByCandidat } from "../../features/candidatureSlice";
import { useNavigate } from "react-router-dom";

export default function Application() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  const { list, loading, error } = useSelector((state) => state.candidatureSlice);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await dispatch(fetchCandidaturesByCandidat(localStorage.getItem("id")));
        console.log("Fetched candidatures:", result.payload);
      } catch (err) {
        console.error('Error fetching candidatures:', err);
      }
    };
    fetchApplications();
  }, [dispatch]);

  const getStatusColor = (date) => {
    const daysSince = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) return "bg-green-100 text-green-800 border-green-200";
    if (daysSince <= 7) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const getStatusText = (date) => {
    const daysSince = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) return "Candidature envoyée aujourd'hui";
    if (daysSince === 1) return "Candidature envoyée hier";
    if (daysSince <= 7) return `Candidature envoyée il y a ${daysSince} jours`;
    return `Candidature envoyée il y a ${daysSince} jours`;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar isOpen={true} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Chargement de vos candidatures...</p>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📋 Mes Candidatures
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Suivez l'état de vos candidatures et gérez vos applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{list?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cette semaine</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {list?.filter(app => {
                      const daysSince = Math.floor((new Date() - new Date(app.dateCandidature)) / (1000 * 60 * 60 * 24));
                      return daysSince <= 7;
                    }).length || 0}
                  </p>
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
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Historique des candidatures
              </h2>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {list && list.length > 0 ? (
                list.map((candidature) => (
                  <div key={candidature.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                            <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Offre ID: {candidature.offreId}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Candidature #{candidature.id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(candidature.dateCandidature).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{getStatusText(candidature.dateCandidature)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigate(`/offres/${candidature.offreId}`)}
                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium hover:underline"
                          >
                            Voir l'offre →
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
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
                    Aucune candidature pour le moment
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Commencez à postuler pour voir vos candidatures apparaître ici.
                  </p>
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