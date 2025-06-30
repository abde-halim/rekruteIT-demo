import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, fetchAllOffres } from '../../features/offreSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { contracts } from '../../consts/contractsTypes';
import { experienceType } from '../../consts/experiences';
import { regions } from '../../consts/regions';
import { Building2, MapPin, Briefcase, Clock, ChevronDown, Search, X } from 'lucide-react';

const FilterSection = ({ title, options, selected, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-6">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-800 dark:text-gray-200">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}>
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};


const JobListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offreResponse, loading, error } = useSelector((state) => state.offreSlice);

  const [contractFilters, setContractFilters] = useState([]);
  const [experienceFilters, setExperienceFilters] = useState([]);
  const [regionFilters, setRegionFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [sortBy] = useState('id');
  const [sortDir] = useState('desc');

  useEffect(() => {
    dispatch(fetchAllOffres({ pageNo: currentPage - 1, pageSize, sortBy, sortDir }));
  }, [dispatch, currentPage, pageSize, sortBy, sortDir]);

  useEffect(() => {
    return () => {
      if (error) dispatch(clearError());
    };
  }, [dispatch, error]);

  const getFilteredJobs = () => {
    if (!offreResponse?.content) return [];
    return offreResponse.content.filter((job) => {
      const matchesContract = contractFilters.length === 0 || contractFilters.includes(job.contrat);
      const matchesExperience = experienceFilters.length === 0 || experienceFilters.includes(job.experience);
      const matchesRegion = regionFilters.length === 0 || regionFilters.includes(job.region);
      return matchesContract && matchesExperience && matchesRegion;
    });
  };

  const handleFilterToggle = (value, filters, setFilters) => {
    setFilters(
      filters.includes(value)
        ? filters.filter((v) => v !== value)
        : [...filters, value]
    );
  };

  const clearAllFilters = () => {
    setContractFilters([]);
    setExperienceFilters([]);
    setRegionFilters([]);
  };

  const filteredJobs = getFilteredJobs();

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="mt-4 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/3 ml-auto"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Find Your Next Opportunity</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {offreResponse?.totalElements || 0} jobs available for you
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filter Jobs</h3>
                <FilterSection
                  title="Contract Type"
                  options={contracts}
                  selected={contractFilters}
                  onToggle={(option) => handleFilterToggle(option, contractFilters, setContractFilters)}
                />
                <FilterSection
                  title="Experience Level"
                  options={experienceType}
                  selected={experienceFilters}
                  onToggle={(option) => handleFilterToggle(option, experienceFilters, setExperienceFilters)}
                />
                <FilterSection
                  title="Region"
                  options={regions}
                  selected={regionFilters}
                  onToggle={(option) => handleFilterToggle(option, regionFilters, setRegionFilters)}
                />
                <div className="pt-6">
                  <button
                    onClick={clearAllFilters}
                    className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2.5 rounded-lg transition"
                  >
                    <X size={18} />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-6">
            {loading && filteredJobs.length === 0 ? (
              Array.from({ length: pageSize }).map((_, i) => <SkeletonCard key={i} />)
            ) : error ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <p className="text-red-500">Failed to load jobs. Please try again later.</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-500 border border-transparent dark:border-gray-700 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <img src={job.recruteur?.image || '/pics/company.avif'} alt="Company" className="w-16 h-16 rounded-xl object-contain bg-gray-50 dark:bg-gray-700 p-1" />
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{job.recruteur?.nomSociete || 'A Company'}</p>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{job.titre}</h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.ville || 'Not specified'}</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.experience || 'Not specified'}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {job.datePosted}</span>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto flex-shrink-0">
                      <button
                        onClick={() => navigate(`/offres/${job.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-200"
                      >
                        View Job
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <Search size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">No Jobs Found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}

            {offreResponse?.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 sm:gap-4 pt-8">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {offreResponse.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === offreResponse.totalPages || loading}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobListPage;