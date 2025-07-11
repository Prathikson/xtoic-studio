import React, { useState } from "react";
import { ChevronRight, X, ExternalLink } from "lucide-react";
import AnimatedTitle from "../../ui/AnimatedTitle";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    year: "2023",
    title: "Bloo",
    description: "A creative launch site for a futuristic design studio.",
    images: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800"
    ],
    link: "https://blooproject.com"
  },
  {
    year: "2023",
    title: "Encounter Stories",
    description: "Immersive storytelling experience built with WebGL.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    ],
    link: "https://encounter.io"
  },
  {
    year: "2024",
    title: "Spaag",
    description: "A visual identity and portfolio site for Spaag Studio.",
    images: [
      "https://images.unsplash.com/photo-1580894908361-967195033215?w=800"
    ],
    link: "https://spaag.studio"
  }
];

const ProjectModal = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-carbonBlack/90 backdrop-blur-lg flex-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-6xl mx-auto px-6 py-10 bg-carbonBlack text-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-zoroRed"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-zentry font-bold mb-2 uppercase">
              {project.title}
            </h2>
            <p className="text-sm text-white/60 mb-6">{project.year}</p>
            <p className="mb-6 text-white/80 font-general">{project.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="project image"
                  className="rounded-lg w-full h-64 object-cover"
                />
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zoroRed hover:underline"
            >
              Visit Live <ExternalLink size={16} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer rounded-2xl bg-beige hover:bg-zoroRed transition-all duration-500 ease-out p-6 flex items-center justify-between group"
    >
      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-600 group-hover:text-white font-general">
          {project.year}
        </span>
        <h3 className="text-xl font-semibold font-zentry group-hover:text-white">
          {project.title}
        </h3>
      </div>
      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="w-full py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="mb-4 font-general text-xs uppercase tracking-widest text-gray-400">
            Recent Work
          </p>
          <AnimatedTitle
            title="Selected <b>P</b>rojects"
            className="special-font !text-5xl md:!text-7xl font-zentry font-black leading-[1]"
            textColor="text-mattBlack"
          />
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;