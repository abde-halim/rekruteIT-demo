import React from 'react'
import Navbar from '../components/LandingPage/Navbar'

function Rekruter() {
    return (
        <>
            <Navbar />
            <h1 className="text-center text-black p-5 bg-gray-200 text-3xl">Company Profile</h1>
            <div className="content p-10">


                <div className="flex justify-between items-center">
                    <div className="left">
                        <h1 className='text-2xl'><h1 className="inline font-bold">Company:</h1> Company IT soltions</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">City:</h1> Rabat</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">Region:</h1> Rabat Salé Kenitra</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">Website:</h1> companlTsol.net</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">Phone:</h1> +212 660000000</h1>
                    </div>
                    <img src="/public/pics/company.avif" alt="company logo" className='w-96' />
                </div>
                <h1 className='text-2xl font-bold py-6'>Company Description</h1>
                <p className='text-2xl'>Company IT soltions is a consulting firm specialized in project management, organizational developmont, and
                    information systems.
                    Its mission is to support clients by providing rigorously selected talented profiles and delivering efficient, tailor-
                    made software ls.
                    Company IT soltions collaborates with various departments that regularly require experts with specific functional or
                    technical expertise.
                    The company is involved from the initial strategic thinking phase all the way through to operational support.</p>
                <button
                    type="button"
                    className="bg-[#514BEE] hover:bg-[#00C2CB] text-white font-bold py-2 px-6 rounded-2xl transition duration-300 shadow-sm my-8 block m-auto"
                >
                    Post a Job
                </button>
            </div>
        </>
    )
}

export default Rekruter