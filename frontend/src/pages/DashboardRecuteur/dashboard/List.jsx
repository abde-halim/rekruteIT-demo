import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/dashboardRecruteur/Sidebar';
import Navbar from '../../../components/dashboardRecruteur/Navbar';
import Footer from '../../../components/dashboardRecruteur/Footer';

import { fetchRecruteurById } from '../../../features/recruteurSlice';
import { fetchOffresByRecruteur } from '../../../features/offreSlice';

import { Briefcase, Users, FileText, Calendar, CheckCircle, Bookmark, ArrowRight } from 'lucide-react';
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
const StatCard = ({ icon, value, label, color, loading }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-4">
    {loading ? (
      <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    ) : (
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
    )}
    <div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </>
      )}
    </div>
  </div>
);

const JobPostingSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg flex justify-between items-center animate-pulse">
    <div className="flex-grow space-y-2">
      <div className="h-5 w-3/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-2/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

const EmptyState = ({ title, message, actionText, actionLink }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mt-2">{message}</p>
    {actionText && actionLink && (
      <Link to={actionLink} className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors">
        {actionText}
      </Link>
    )}
  </div>
);

export default function RecruteurDashboard() {
  const dispatch = useDispatch();
  const recruiterId = localStorage.getItem("id");

  const { currentRecruteur: recruiter, loading: recruiterLoading } = useSelector(state => state.recruteurSlice);
  const { offres, loading: offresLoading } = useSelector(state => state.offreSlice);

  useEffect(() => {
    if (recruiterId) {
      dispatch(fetchRecruteurById(recruiterId));
      dispatch(fetchOffresByRecruteur(recruiterId));
    }
  }, [dispatch, recruiterId]);

  const isLoading = recruiterLoading || offresLoading;
  const totalApplicants = offres.reduce((acc, offre) => acc + (offre.candidatures?.length || 0), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={true} />
        <main className="flex-1 p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {isLoading ? '...' : recruiter?.nomSociete || 'Recruiter'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your hiring pipeline today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={<Briefcase size={24} className="text-white" />} value={isLoading ? '-' : offres.length} label="Active Job Posts" color="bg-blue-500" loading={isLoading} />
            <StatCard icon={<Users size={24} className="text-white" />} value={isLoading ? '-' : totalApplicants} label="Total Applicants" color="bg-green-500" loading={isLoading} />
            <StatCard icon={<FileText size={24} className="text-white" />} value={0} label="New This Week" color="bg-yellow-500" loading={isLoading} />
          </div>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Active Postings</h2>
              {!isLoading && offres.length > 3 && (
                <Link to="/offreRecruteur" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1">
                  View all {offres.length}
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
            <div className="space-y-4">
              {isLoading ? (
                [...Array(3)].map((_, i) => <JobPostingSkeleton key={i} />)
              ) : offres.length > 0 ? (
                offres.slice(0, 3).map(job => (
                  <div key={job.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{job.titre}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{job.candidatures?.length || 0} Applicants</span>
                      </div>
                    </div>
                    <Link to={`/offreRecruteur/application/${job.id}`} className="bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-gray-700 dark:text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                      View Applicants
                    </Link>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No Active Job Postings"
                  message="Post a new job to attract top talent."
                  actionText="Post a New Job"
                  actionLink="/offreRecruteur/ajouter"
                />
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}