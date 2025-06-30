import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { regions } from '../../consts/regions';

function HeroSection() {
    return (
        <div className="flex p-10 my-10 justify-between min-h-[calc(100vh-96px)]bg-gradient-to-r from-white via-[#f0f4ff] to-[#e0f7fa]">
            <div className="w-1/2">
                <h1 className="text-6xl font-bold w-3/4 leading-tight">
                    Find A <span className="text-[#514BEE]">Job</span> That <span className="text-[#514BEE]">Matches</span> Your passion
                </h1>
                <p className="py-8 text-gray-600">
                    Hand-picked opportunities to work from home, remotely, freelance,
                    full-time, part-time, contract and internships.
                </p>

                {/* <div className="flex items-center justify-start py-8 px-0">
                    <div className="flex w-full max-w-3xl bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
                        <input
                            type="text"
                            placeholder="Job Title or Company"
                            className="flex-1 px-5 py-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
                        />
                        <div className="w-px bg-gray-200 my-2" />
                        <select
                            className="flex-1 px-5 py-4 text-sm text-gray-700 bg-white focus:outline-none appearance-none"
                            defaultValue=""
                        >
                            <option value="" disabled>Select Location</option>
                            {regions.map((region) => (
                                <option value={region} >{region}</option>
                            ))}
                        </select>
                        <div className="w-px bg-gray-200 my-2" />
                        <button
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#514BEE] to-indigo-500 text-white w-60 py-4 text-sm font-semibold hover:brightness-110 transition duration-300 rounded-r-3xl"
                        >
                            <FaSearch className="text-white" />
                            Search
                        </button>

                    </div>
                </div> */}
            </div>

            <img src="/public/pics/employee.webp" alt="employee" className="w-1/3 drop-shadow-lg" />
        </div>
    );
}

export default HeroSection;
