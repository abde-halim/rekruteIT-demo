import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import HeroSection from '../components/LandingPage/HeroSection'
import AvailablePosts from '../components/LandingPage/AvailablePosts'
import StatsSection from '../components/LandingPage/stats'
import Footer from '../components/LandingPage/Footer'

function Main() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <AvailablePosts />
            <Footer />
        </main>
    )
}

export default Main