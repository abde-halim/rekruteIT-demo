import React, { useState, useEffect } from 'react';
import Navbar from '../LandingPage/Navbar';

const JobListing = () => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="mt-16 relative">
      <Navbar />

      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
          Link copied to clipboard!
        </div>
      )}

      <div className="w-full bg-gray-100 py-6">
        <h1 className="text-center text-xl font-semibold text-gray-800">
          Laravel Developer <span className="text-sm font-normal align-top">(CDI)</span> – Company IT solutions
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto my-5 p-8">
        <div className="flex justify-center gap-4 mb-10">
          <button className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            View Company
          </button>
          <button
            className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={handleCopyLink}
          >
            Copy Link
          </button>
          <button className="text-sm px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            Apply
          </button>
        </div>
        <div className="mb-6 space-y-4">
          {[
            ['Minimum Qualification', 'Bac+3'],
            ['Experience Level', '5+ years minimum'],
            ['Experience Length', '2 years'],
            ['Location', 'San Francisco, USA'],
            ['Application Deadline', '12/08/2022'],
            ['Salary Range', '4,000 - 6,000 DH'],
          ].map(([title, value]) => (
            <div key={title}>
              <h2 className="font-semibold text-gray-700">{title}</h2>
              <p className="text-gray-500">{value}</p>
            </div>
          ))}
        </div>
        <h2 className="font-semibold text-gray-700 mb-2">Job Description</h2>
        <p className="text-gray-600 mb-6">
          We are searching for a Laravel developer to build web applications for our company...
          <br /><br />
          To ensure success as a Laravel developer...
        </p>
        <h3 className="font-semibold text-gray-700 mb-2">Laravel Developer Requirements:</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
          <li>A degree in programming, computer science, or a related field.</li>
          <li>Experience working with PHP, unit testing, APIs like REST.</li>
          <li>Solid understanding of application design using Laravel.</li>
          <li>Knowledge of SQL and database design.</li>
          <li>Proficiency in HTML/JavaScript. Vue.js is a plus.</li>
          <li>Practical experience using MVC architecture.</li>
          <li>Comfortable in a LAMP stack environment.</li>
          <li>Strong problem-solving mindset.</li>
          <li>Good communication skills.</li>
          <li>Willingness to learn continuously.</li>
        </ul>
        <h3 className="font-semibold text-gray-700 mb-2">Responsibilities:</h3>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Collaborate with client and dev team on project goals.</li>
          <li>Design and develop Laravel-based applications.</li>
          <li>Debug issues and troubleshoot efficiently.</li>
          <li>Coordinate with front-end and back-end developers.</li>
          <li>Conduct functional testing for all components.</li>
          <li>Ensure integrations work smoothly.</li>
          <li>Scale apps based on client feedback.</li>
          <li>Maintain records and documentation.</li>
          <li>Maintain and support existing applications.</li>
          <li>Present work progress in client meetings.</li>
        </ul>
      </div>
    </div>
  );
};

export default JobListing;
