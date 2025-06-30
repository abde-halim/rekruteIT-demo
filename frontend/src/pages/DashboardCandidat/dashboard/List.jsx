import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCandidateById } from '../../../features/candidatSlice';
import { fetchAllOffres } from '../../../features/offreSlice';
import { fetchCandidaturesByCandidat } from "../../../features/candidatureSlice";

import Sidebar from '../../../components/dashboardCandidat/Sidebar';
import Navbar from '../../../components/dashboardCandidat/Navbar';
import Footer from '../../../components/dashboardCandidat/Footer';

import { Briefcase, Eye, Bookmark, CheckSquare, ArrowRight, Building2, MapPin, Clock } from 'lucide-react';
import { aiMatchesOffres } from '../../../features/AiSlice';

const StatCard = ({ icon, value, label, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);
const ProfileCompletenessCard = ({ candidate }) => {
  const calculateCompleteness = () => {
    if (!candidate) return 0;
    let score = 0;
    const fields = ['nom', 'prenom', 'email', 'telephone', 'ville', 'post', 'image'];
    fields.forEach(field => {
      if (candidate[field]) score++;
    });
    if (candidate.experiences?.length > 0) score++;
    if (candidate.diplomes?.length > 0) score++;
    if (candidate.languages?.length > 0) score++;
    return Math.round((score / (fields.length + 3)) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Profile Completeness</h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completeness}%` }}></div>
      </div>
      <p className="text-right text-sm text-blue-600 font-bold mt-2">{completeness}%</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Complete your profile to get better job recommendations.
      </p>
      <Link to="/profile/edit" className="mt-4 w-full bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-800 dark:text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        Update Profile <ArrowRight size={16} />
      </Link>
    </div>
  );
};

const JobCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg animate-pulse">
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const MatchPercentageCircle = ({ percent }) => {
  const sqSize = 80;
  const strokeWidth = 8;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const circumference = radius * 2 * Math.PI;
  const dashOffset = circumference - (percent / 100) * circumference;

  const percentageColor = percent > 75 ? 'text-green-500' : percent > 50 ? 'text-blue-500' : 'text-yellow-500';

  return (
    <div className="relative flex items-center justify-center" style={{ width: sqSize, height: sqSize }}>
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className="text-gray-200 dark:text-gray-700"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          fill="none"
          stroke="currentColor"
        />
        <circle
          className={`transition-all duration-1000 ease-in-out ${percentageColor}`}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        />
      </svg>
      <div className={`absolute text-lg font-bold ${percentageColor}`}>
        {percent}%
      </div>
    </div>
  );
};


export default function Dashboard() {
  const dispatch = useDispatch();
  const candidateId = localStorage.getItem("id");

  const { data: candidate, loading: candidateLoading } = useSelector(state => state.candidateSlice);
  // const { offreResponse, loading: offresLoading } = useSelector(state => state.offreSlice);
  const { list: applications, loading: applicationsLoading } = useSelector(state => state.candidatureSlice); // Uncomment when ready
  const { data: offreResponse, isLoading: offresLoading } = useSelector(state => state.AiSlice);

  useEffect(() => {
    if (candidateId) {
      dispatch(fetchCandidateById(candidateId));
      dispatch(fetchAllOffres({ pageNo: 0, pageSize: 4, sortBy: 'id', sortDir: 'desc' }));
      dispatch(fetchCandidaturesByCandidat(candidateId)); // Uncomment when ready
      dispatch(aiMatchesOffres(candidateId));
    }
  }, [dispatch, candidateId]);

  // // Mock data until application slice is ready
  // const applications = { content: [{ id: 1, offre: { titre: 'Frontend Developer' }, status: 'Pending' }] };
  // const savedJobsCount = candidate?.savedJobs?.length || 5; // Placeholder

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={true} />
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {candidate?.prenom || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Here is your job search summary and recommendations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <StatCard icon={<Briefcase size={24} className="text-white" />} value={applications?.length || 0} label="Applications Sent" color="bg-blue-500" />
            {/* <StatCard icon={<Eye size={24} className="text-white" />} value={candidate?.profileViews || 0} label="Profile Views" color="bg-green-500" /> */}
            {/* <StatCard icon={<Bookmark size={24} className="text-white" />} value={savedJobsCount} label="Saved Jobs" color="bg-yellow-500" /> */}
            {/* <StatCard icon={<CheckSquare size={24} className="text-white" />} value={applications?.content?.filter(a => a.status === "Accepted").length || 0} label="Offers Accepted" color="bg-red-500" /> */}
            <ProfileCompletenessCard candidate={candidate} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recommended For You</h2>
              <div className="space-y-4">
                {offresLoading ? (
                  [...Array(4)].map((_, i) => <JobCardSkeleton key={i} />)
                ) : (
                  offreResponse?.map((job) => (
                    <div key={job.offreId} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-500 border-2 border-transparent transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">

                        <div className="flex-grow w-full">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                              Recommended Opportunity
                            </p>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{job.titre}</h3>

                          {job.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                              {job.description}
                            </p>
                          )}
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full sm:w-auto">
                          <div>
                            <p className="text-xs text-center font-medium text-gray-500 dark:text-gray-400 mb-1">Match Score</p>
                            <MatchPercentageCircle percent={job.percent} />
                          </div>
                          <Link
                            to={`/offres/${job.offreId}`}
                            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* <aside className="space-y-6">

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Applications</h3>
                <div className="space-y-4">
                  {applications?.map(app => (
                    <div key={app.id} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{app.titre}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Applied on {new Date().toLocaleDateString()}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 rounded-full">{app.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside> */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}