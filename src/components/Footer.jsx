import { useState } from "react";
import TermsModal from "./models/TermsModal";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { useCookieConsentContext } from "./CookieConsent/CookieProviderWrapper"; // Adjust path accordingly

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const { setShowModal: setCookieModalVisible } = useCookieConsentContext();

  return (
    <>
      <footer className="bg-carbonBlack text-lightGray py-8 px-4 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Terms & Cookie Links */}
          <div className="flex gap-6">
            <p
              role="button"
              tabIndex={0}
              onClick={() => setShowModal(true)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setShowModal(true)
              }
              className="cursor-pointer text-sm text-lightGray underline hover:text-red-30 transition focus:outline-none"
            >
              Terms & Conditions
            </p>

            <p
              role="button"
              tabIndex={0}
              onClick={() => setCookieModalVisible(true)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setCookieModalVisible(true)
              }
              className="cursor-pointer text-sm text-lightGray underline hover:text-red-30 transition focus:outline-none"
            >
              Cookie Preferences
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 md:justify-start">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightGray transition-colors duration-500 ease-in-out hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div>
            <p className="text-sm text-center md:text-end text-lightGray">
              © {new Date().getFullYear()} XTOIC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      {showModal && <TermsModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Footer;
