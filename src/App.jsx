import useLenis from "./hooks/useLenis"; // 👈 Add this line
import CookieProviderWrapper from "./components/CookieConsent/CookieProviderWrapper";
import CookieBanner from "./components/CookieConsent/CookieBanner";
import CookieModal from "./components/CookieConsent/CookieModal";
import NavBar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Featutres from "./components/sections/Features";
import Story from "./components/sections/Story";
import Pricing from "./components/sections/Pricing";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Testimonials from "./components/sections/Testimonials";
import Test from "./components/sections/Test";
import Project from "./components/sections/Project";
import About from "./components/sections/About";
import ComparisonSection from "./components/sections/ComparisonSection";
import ContactForm from "./components/sections/ContactForm";

function App() {
  useLenis(); 

  return (
    <CookieProviderWrapper>
      <main
        data-lenis
        className="relative min-h-screen w-screen overflow-x-hidden antialiased"
      >
        <NavBar />
        <Hero />
        <About />
        <Featutres />
        <Test />
        <Project />
        <Story />
        <ComparisonSection />
        <Testimonials />
        <Pricing />
        <Contact />
        <ContactForm/>
        <Footer />
        <CookieBanner />
        <CookieModal />
      </main>
    </CookieProviderWrapper>
  );
}

export default App;
