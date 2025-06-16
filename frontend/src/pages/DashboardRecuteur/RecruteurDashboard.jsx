import React, { useState } from 'react';
import { Bookmark, CheckCircle, Menu, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboardRecruteur/Sidebar';
import Navbar from '../../components/dashboardRecruteur/Navbar';
import Footer from '../../components/dashboardRecruteur/Footer';

const profiles = [
  {
    id: 1,
    title: 'abdelilah halim',
    company: 'company X',
    location: 'rabat',
    // remote: true,
    // salary: '$15k Monthly',
    // successScore: 75,
    verified: true,
    // description:
    //   'We are looking for a talented designer to help us create beautiful and functional interfaces for our company. Your role requires you to understand users very well.',
  },
];

const sidebarLinks = [
  'Dashboard',
  'Profile',
  'My Applications',

];

export default function RecruteurDashboard() {
  const [savedJobs, setSavedJobs] = useState([]);


  const toggleSaveJob = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white"> welcome </h1>
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Profils recommandés <span className="text-gray-400">({profiles.length})</span></h2>
            <div className="space-y-4">
              {profiles.map((job) => (
                <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                    </div>
                    <button onClick={() => toggleSaveJob(job.id)}>
                      <Bookmark className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'text-purple-600' : 'text-gray-400 dark:text-gray-500'}`} />
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 items-center">
                    <span>{job.location}</span>
                    {job.remote && <span>Remote</span>}
                    <span>{job.salary}</span>
                  </div>
                  <button
                    className="mt-2 w-fit bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    onClick={() => alert(`consuting to ${job.title}`)}
                  >
                    consulter le profile
                  </button>
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
