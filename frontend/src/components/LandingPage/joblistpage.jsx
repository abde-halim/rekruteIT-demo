import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationDot } from "react-icons/fa6";
import { RiFileInfoLine } from "react-icons/ri";
import { clearError, fetchAllOffres } from '../../features/offreSlice';
import Navbar from './Navbar';
import { contracts } from '../../consts/contractsTypes';
import { experienceType } from '../../consts/experiences';
import { regions } from '../../consts/regions';
import Footer from './Footer';

const JobListPage = () => {
  const dispatch = useDispatch();
  const {
    offreResponse,
    loading,
    error
  } = useSelector((state) => state.offreSlice);
  const [contractFilters, setContractFilters] = useState([]);
  const [experienceFilters, setExperienceFilters] = useState([]);
  const [jobTypeFilters, setJobTypeFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy] = useState('id');
  const [sortDir] = useState('desc');

  useEffect(() => {
    dispatch(fetchAllOffres({
      pageNo: currentPage - 1,
      pageSize,
      sortBy,
      sortDir
    }));
  }, [dispatch, currentPage, pageSize, sortBy, sortDir]);
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  const getExperience = (title) => {
    if (!title) return "Other";
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("junior")) return "Junior";
    if (lowerTitle.includes("7") || lowerTitle.includes("senior")) return "7+ Years";
    if (lowerTitle.includes("3+") || lowerTitle.includes("expérience")) return "3+ Years";
    return "Other";
  };
  const getFilteredJobs = () => {
    if (!offreResponse?.content) return [];

    return offreResponse.content.filter((job) => {
      const exp = getExperience(job.titre);

      const matchesContract = contractFilters.length === 0 ||
        contractFilters.some(filter =>
          job.typeContrat?.toLowerCase().includes(filter.toLowerCase()) ||
          job.typeEmploi?.toLowerCase().includes(filter.toLowerCase())
        );

      const matchesExperience = experienceFilters.length === 0 ||
        experienceFilters.includes(exp);

      const matchesType = jobTypeFilters.length === 0 ||
        jobTypeFilters.some(filter =>
          job.typeEmploi?.toLowerCase().includes(filter.toLowerCase())
        );

      return matchesContract && matchesExperience && matchesType;
    });
  };

  const filteredJobs = getFilteredJobs();

  const toggleFilter = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(fetchAllOffres({
      pageNo: 0,
      pageSize,
      sortBy,
      sortDir
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const FilterSection = ({ title, options, selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="border rounded-md overflow-hidden">
        <div
          className="bg-[#514BEE] text-white px-4 py-2 cursor-pointer flex justify-between items-center"
          onClick={() => setOpen(!open)}
        >
          <span className="font-semibold">{title}</span>
          <span>{open ? "−" : "+"}</span>
        </div>
        {open && (
          <div className="p-3 space-y-2">
            {options.map((option, i) => (
              <label key={i} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleFilter(option, selected, setSelected)}
                  className="accent-red-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des offres...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur: {error}</p>
          <button
            onClick={() => {
              dispatch(fetchAllOffres({
                pageNo: currentPage - 1,
                pageSize,
                sortBy,
                sortDir
              }));
            }}
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <> <Navbar />
      <div className="min-h-screen p-6 sm:p-10 bg-white">
        <div className="text-4xl font-extrabold text-gray-900 mb-8">
          Offres d'emploi ({offreResponse?.totalElements || 0} offres)
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-4 rounded-xl">
            <FilterSection
              title="Types de contrat"
              options={contracts}
              selected={contractFilters}
              setSelected={setContractFilters}
            />
            <FilterSection
              title="Niveaux d'expérience"
              options={experienceType}
              selected={experienceFilters}
              setSelected={setExperienceFilters}
            />
            <FilterSection
              title="Regions"
              options={regions}
              selected={jobTypeFilters}
              setSelected={setJobTypeFilters}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full   bg-[#18165d] text-white font-semibold py-2 rounded-md shadow transition-colors"
            >
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </aside>
          <div className="flex-1 space-y-6">

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div
                  key={job.id || index}
                  className="flex justify-between items-center border p-5 rounded-2xl hover:bg-blue-50 transition-colors duration-200 shadow-sm"
                >
                  <div className="details">
                    <p className="text-gray-500">{job.recruteur?.entreprise || 'Entreprise'}</p>
                    <h1 className='text-2xl font-bold text-gray-800'>{job.titre}</h1>
                    <div className="flex gap-5 py-2 text-gray-600">
                      <p><FaLocationDot className='inline mr-1' /> {job.ville || 'Non spécifié'}</p>
                      <p><RiFileInfoLine className='inline mr-1' /> {job.formation || 'Type non spécifié'} / {job.contrat || 'Contrat non spécifié'}</p>
                    </div>
                    {job.description && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {job.description.substring(0, 150)}...
                      </p>
                    )}
                  </div>
                  <a
                    href={`/offres/${job.id}`}
                    className='bg-[#514BEE] hover:bg-[#3e39c9] transition duration-200 text-white font-semibold px-5 py-2 rounded-full shadow-md'
                    onClick={() => {
                      console.log('View job:', job.id);
                    }}
                  >
                    Voir le poste
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">
                {offreResponse?.content?.length === 0
                  ? "Aucune offre d'emploi disponible."
                  : "Aucun poste trouvé avec ces filtres."
                }
              </p>
            )}
            {offreResponse && offreResponse.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Précédent
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, offreResponse.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(
                      currentPage - 2 + i,
                      offreResponse.totalPages - 4 + i
                    ));

                    if (pageNum > offreResponse.totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`px-3 py-1 rounded-md text-sm ${currentPage === pageNum
                          ? 'bg-red-700 text-white'
                          : 'border hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === offreResponse.totalPages || loading}
                  className="px-4 py-2 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Suivant
                </button>
              </div>
            )}
            {offreResponse && (
              <div className="text-center text-sm text-gray-600 mt-4">
                Page {offreResponse.pageNo + 1} sur {offreResponse.totalPages}
                ({offreResponse.totalElements} offres au total)
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer /></>
  );
};

export default JobListPage;