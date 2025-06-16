import { Building2, Globe, MapPin, Mail, Phone, Edit, User, Briefcase, Star, Users } from "lucide-react";
import Footer from "../../../components/dashboardRecruteur/Footer";
import Navbar from "../../../components/dashboardRecruteur/Navbar";
import Sidebar from "../../../components/dashboardRecruteur/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruteurById } from "../../../features/recruteurSlice";
import toast from "react-hot-toast";

export default function ProfileRecruteur() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});

  const { currentRecruteur: data, loading, error, user } = useSelector((state) => state.recruteurSlice);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(fetchRecruteurById(localStorage.getItem("id")));
      } catch (err) {
        toast.error('Network error occurred.');
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar isOpen={true} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
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

        <main className="flex-1 p-6 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden pt-20">
            <div className="bg-gradient-to-r relative">
              <div className="absolute top-4 right-4">
                <Link
                  to="/profileRecruteur/edit"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 backdrop-blur-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end -mt-16 relative">
                <div className="relative">
                  <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={data?.logo != null ? data?.logo : "/pics/company.avif"}
                      alt="Company logo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* <div className="w-full h-full hidden items-center justify-center bg-gray-100 dark:bg-gray-600">
                      <Building2 className="w-12 h-12 text-gray-400" />
                    </div> */}
                  </div>
                </div>

                <div className="mt-6 lg:mt-0 lg:ml-8 flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {data?.nomSociete || 'Company Name'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                        <Mail className="w-4 h-4 " />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium">{user?.email || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                        <Phone className="w-4 h-4 " />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="font-medium">{data?.telephone} </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                        <MapPin className="w-4 h-4 " />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="font-medium">{data?.ville}, {data?.region}</p>
                      </div>
                    </div>

                    {data?.siteWeb && (
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                          <Globe className="w-4 h-4 " />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                          <a
                            href={data.siteWeb.startsWith('http') ? data.siteWeb : `https://${data.siteWeb}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium  hover:text-blue-700 hover:underline"
                          >
                            {data.siteWeb}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {data?.description && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">À propos de notre entreprise</h3>
                  <p className="text-gray-600 dark:text-gray-300">Présentation et mission de l'entreprise</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                {data.description}
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}