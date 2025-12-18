import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import OurTours from './components/OurTours/OurTours'
import Footer from './components/Footer/Footer'
import WhatsAppFloat from './components/WhatsApp/WhatsAppFloat'
import TourDetails from './components/TourDetails/TourDetails'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import { createGlobalStyle } from 'styled-components'
import RegionDetails from './components/RegionDetails/RegionDetails'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import VideoShowcase from './components/VideoShowcase/VideoShowcase'
import TourGallery from './components/TourGallery/TourGallery'
import Transfer from './components/Transfer/Transfer'
// Novos componentes para aumentar conversão
import PromotionCTA from './components/PromotionCTA/PromotionCTA'
import EnhancedTestimonials from './components/EnhancedTestimonials/EnhancedTestimonials'
import ContactForm from './components/ContactForm/ContactForm'
import Guarantees from './components/Guarantees/Guarantees'
import PricingSection from './components/PricingSection/PricingSection'
import PackageComparison from './components/PackageComparison/PackageComparison'
import LeadPopup from './components/LeadPopup/LeadPopup'
import EducationalContent from './components/EducationalContent/EducationalContent'
import Reviews from './components/Reviews/Reviews'
import ChatBot from './components/ChatBot/ChatBot'


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    color: #333;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

const AppContent = () => {
  const location = useLocation();
  const isTourDetails = location.pathname.includes('/tour/');

  return (
    <>
      {!isTourDetails && <Navbar />}
      <Routes>
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/region/:id" element={<RegionDetails />} />
        <Route path="/" element={
          <>
            <Home />
            <PromotionCTA />
            <About />
            <OurTours />
            <Transfer />
            <WhyChooseUs />
            {/* <PricingSection /> */}
            {/*<PackageComparison />*/}
            <Guarantees />
            <VideoShowcase />
            <EnhancedTestimonials />
            <TourGallery />
            <EducationalContent />
            <ContactForm />
          </>
        } />
      </Routes>
      {!isTourDetails && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div>
        <AppContent />
        <WhatsAppFloat />
        <LeadPopup />
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
