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



function App() {
  return (
    <CookieProviderWrapper>
      <main className="relative min-h-screen w-screen overflow-x-hidden antialiased">
        <NavBar />
        <Hero />
        <About/>
        <Featutres />
        <Test/>
        <Project/>
        <Story />
        <Testimonials/>
        <Pricing/>
        <Contact/>
        <Footer />
        <CookieBanner />
        <CookieModal />
      </main>
    </CookieProviderWrapper>
  );
}

export default App;
