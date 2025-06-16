import React, { useState } from 'react'
import Navbar from '../components/LandingPage/Navbar'
import { FaLocationDot } from 'react-icons/fa6'
import { RiFileInfoLine } from 'react-icons/ri'

function Profile() {
    const [education, setEducation] = useState([
        {
            ecole: "École Supérieure de Management de Télécommunication et d'informatique Sup MTI",
            title: "Bac+5 , Ingénirie des systèmes d'informatique",
            date: "2014-1019"
        },
        {
            ecole: "École Supérieure de Management de Télécommunication et d'informatique Sup MTI",
            title: "Bac+5 , Ingénirie des systèmes d'informatique",
            date: "2014-1019"
        },
    ]
    )
    const [experience, setExperience] = useState([
        {
            post: "tech lead",
            company: "webdev consulting",
            date: "2 years (january 2023 - now)",
            city: "casablanca"
        },
        {
            post: "tech lead",
            company: "webdev consulting",
            date: "2 years (january 2023 - now)",
            city: "casablanca"
        },
    ])
    const [languages, setLanguages] = useState([
        {
            lang: "french",
            level: "native"
        },
        {
            lang: "english",
            level: "fluent"
        },
    ])
    return (
        <>
            <Navbar />
            <h1 className="text-center text-black p-5 bg-gray-100 text-3xl">Company Profile</h1>
            <div className="content p-10">
                <div className="flex justify-between items-center">
                    <div className="left">
                        <h1 className='text-2xl'><h1 className="inline font-bold">Full Name:</h1> ahrned mohammed</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">City:</h1> Rabat</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">Region:</h1> Rabat Salé Kenitra</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">Email:</h1> ahmedX@gmaiI.com</h1>
                        <h1 className='text-2xl'><h1 className="inline font-bold">Phone:</h1> +212 660000000</h1>
                    </div>
                    <img src="/public/pics/profile.avif" alt="company logo" className='w-96' />
                </div>
                <h1 className='text-2xl font-bold mt-12'>Education</h1>
                <div className=" space-y-6 mt-5">
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            className=" border border-gray-500 p-5 rounded-2xl hover:bg-blue-50 transition-colors duration-200"
                        >
                            <div className="details">
                                <h1 className='text-2xl font-bold text-gray-800'>{edu.ecole}</h1>
                                <p className="text-gray-500 text-xl py-2">{edu.title}</p>
                                <h1 className=' font-bold text-gray-800'>{edu.date}</h1>

                            </div>
                        </div>
                    ))}
                </div>
                <h1 className='text-2xl font-bold mt-12'>Experience</h1>
                <div className=" space-y-6 mt-5">
                    {experience.map((exp, index) => (
                        <div
                            key={index}
                            className="border border-gray-500 p-8 rounded-2xl hover:bg-blue-50 transition-colors duration-200"
                        >
                            <div className="details flex justify-between items-center">
                                <div className="left">
                                    <h1 className='text-2xl font-bold text-gray-800'>{exp.post}</h1>
                                    <p className="text-gray-500 text-xl py-2">{exp.company}</p>
                                </div>
                                <div className="right">
                                    <p className=" text-xl">{exp.date}</p>
                                    <p className="text-xl">{exp.city}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 className='text-2xl font-bold mt-12'>languages</h1>
                <div className="offers space-y-6 mt-5 text-xl">
                    {languages.map((lang, index) => (
                        `${lang.lang} : ${lang.level} `
                    ))}
                </div>

            </div>
        </>
    )
}

export default Profile