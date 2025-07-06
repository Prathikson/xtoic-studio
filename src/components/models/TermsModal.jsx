import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TermsModal = ({ onClose }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0B0B0F] text-white p-6 rounded-2xl w-[90%] max-w-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl special-font font-zentry mb-4 text-white-50 underline">
          T<b>e</b>rms & C<b>o</b>n<b>di</b>tions
        </h2>

        <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          <p className="text-sm leading-relaxed text-lightGray space-y-3">
            This website is operated by Prathikson and Team. The content provided is for general informational purposes only and may be updated or changed at any time.
            <br /><br />
            By accessing or using this website, you agree to comply with and be bound by these terms. You may not republish, reproduce, or distribute any content without prior written permission.
            <br /><br />
            We reserve the right to suspend or terminate access to the site for users who violate our terms.
            <br /><br />
            For full details, please contact us directly. Enjoy Your Visit 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
