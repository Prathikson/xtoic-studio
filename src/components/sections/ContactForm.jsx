import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ScratchReveal from "../ui/ScratchReveal";

const ContactForm = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex justify-center w-screen min-h-screen bg-lightGray px-6 md:px-16 py-12"
    >
      <div className="flex flex-col md:flex-row rounded-2xl shadow-lg  w-screen overflow-hidden border bg-carbonBlack" style={{ minHeight: "800px" }}>
        {/* Left: Contact Form */}
        <div className="md:w-1/2 p-10 flex items-center justify-center bg-carbonBlack">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-8"
          >
            <h2 className="text-5xl font-semibold font-zentry text-lightGray mb-6">
              Contact Us
            </h2>

            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-regular text-lightGray">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What’s your good name?"
                required
                className="rounded-md border placeholder:text-white text-white bg-mattBlack  border-mattBlack px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zoroRed focus:border-zoroRed transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 font-regular text-lightGray"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What’s your email address?"
                required
                className="rounded-md border text-white placeholder:text-white bg-mattBlack  border-mattBlack px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zoroRed focus:border-zoroRed transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="mb-2 font-regular text-lightGray"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                rows="5"
                required
                className="rounded-md text-white placeholder:text-white bg-mattBlack border border-mattBlack px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-zoroRed focus:border-zoroRed transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-zoroRed text-beige rounded-full font-medium hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right: ScratchReveal */}
        <div className="md:w-1/2 flex items-center justify-center bg-carbonBlack p-10">
          <div className="w-full max-w-7xl h-[300px] md:h-[800px]">
            <ScratchReveal imageSrc="/img/logox.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
