import { Bookmark, CheckCircle } from "lucide-react";
import Footer from "../../../components/dashboardRecruteur/Footer";
import Navbar from "../../../components/dashboardRecruteur/Navbar";
import Sidebar from "../../../components/dashboardRecruteur/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { fetchOffresByRecruteur } from "../../../features/offreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Offres() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState()
  const [deleteItem, setDeleteItem] = useState(false)
  const { offres: list, loading, error } = useSelector((data) => data.offreSlice)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOffresByRecruteur(localStorage.getItem("id")))
      } catch (err) {
        toast.error('Erreur de réseau.');
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={true} />
        <main className="flex-1 p-6 space-y-8 bg-gray-50 dark:bg-gray-900">
          <section className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Total des offres
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vous avez <span className="font-semibold text-purple-600">{list?.length}</span> offres.
                </p>
              </div>
              <Link
                to="ajouter"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition"
              >
                + Ajouter une offre
              </Link>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {list?.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col justify-between transition hover:shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {job.titre}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {job.verified && (
                        <span className="flex items-center gap-1 text-purple-600 font-medium">
                          <CheckCircle className="w-4 h-4" /> Entreprise vérifiée
                        </span>
                      )}
                      <span>{job.location}</span>
                      {job.remote && <span>Télétravail</span>}
                      <span>{job.salary}</span>
                      <span className="text-purple-600 font-medium">
                        {job.salaire} DH | {job.contrat}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => Navigate(`/offreRecruteur/application/${job.id}`)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition"
                    >
                      candidatures
                    </button>
                    <button
                      onClick={() => Navigate(`/offres/${job.id}`)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition"
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => Navigate(`/offreRecruteur/${job.id}/edit`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}