import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOffres } from '../../features/offreSlice';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';

// --- Skeleton Card for Loading State ---
const JobCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
        <div className="mt-4 h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="mt-2 h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="mt-4 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/3"></div>
    </div>
);

// --- Main AvailablePosts Component ---
function AvailablePosts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { offreResponse, loading, error } = useSelector((state) => state.offreSlice);

    useEffect(() => {
        // Fetch only the first page with 3 recent jobs
        dispatch(fetchAllOffres({ pageNo: 0, pageSize: 3, sortBy: 'id', sortDir: 'desc' }));
    }, [dispatch]);

    const jobs = offreResponse?.content || [];

    return (
        // The background color class has been removed from this section
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#514BEE]">Recent Job Offers</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Discover the latest opportunities added to our platform.</p>
                    </div>
                    <Link
                        to="/offres"
                        className='mt-4 sm:mt-0 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline'
                    >
                        View All Jobs <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => <JobCardSkeleton key={i} />)
                    ) : error ? (
                        <div className="col-span-full text-center text-red-500">
                            <p>Could not load jobs. Please try again later.</p>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                <div className="p-6 flex-grow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={job.recruteur?.image || '/pics/company.avif'} alt="Company" className="w-12 h-12 rounded-lg object-contain bg-gray-50 dark:bg-gray-700 p-1" />
                                        <div>
                                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{job.recruteur?.nomSociete || 'A Company'}</p>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 leading-tight">{job.titre}</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
                                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Briefcase size={16} className="text-blue-500" /> {job.experience}</p>
                                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Briefcase size={16} className="text-blue-500" /> {job.formation}</p>
                                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><MapPin size={16} className="text-blue-500" /> {job.ville}</p>
                                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Clock size={16} className="text-blue-500" /> {job.datePosted}</p>
                                    </div>
                                </div>
                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => navigate(`/offres/${job.id}`)}
                                        className="w-full bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-800 dark:text-white font-bold py-2.5 px-5 rounded-lg transition-colors duration-200"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default AvailablePosts;