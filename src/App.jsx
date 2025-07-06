import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieProviderWrapper from "./components/CookieConsent/CookieProviderWrapper";
import CookieBanner from "./components/CookieConsent/CookieBanner";
import CookieModal from "./components/CookieConsent/CookieModal";


function App() {
  return (
    <CookieProviderWrapper>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
        {/* Place cookie banner and modal here */}
        <CookieBanner />
        <CookieModal />
      </main>
    </CookieProviderWrapper>
  );
}

export default App;
