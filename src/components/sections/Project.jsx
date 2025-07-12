import React from 'react';
import SolutionsCards from "../ui/SolutionsCards";
import ScrambleHeader from '../ui/ScrambleHeader';
import AnimatedTitle from '../ui/AnimatedTitle';

const solutions = [
  {
    id: 1,
    title: "Creative Portfolio",
    subtitle: "Showcasing Your Identity",
    tags: ["Web Design", "UX", "Animations"],
    imageUrl: "/img/gallery-4.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-laptop-computer-4904-large.mp4",
    websiteUrl: "#"
  },
  {
    id: 2,
    title: "Ecommerce Platform",
    subtitle: "Conversion-Focused UX",
    tags: ["Web Development", "Shopify", "3D"],
    imageUrl: "/img/gallery-2.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-online-shopping-on-laptop-4966-large.mp4",
    websiteUrl: "#"
  },
  {
    id: 3,
    title: "Interactive Landing Page",
    subtitle: "Engaging, Animated, Fast",
    tags: ["Next.js", "Tailwind", "GSAP"],
    imageUrl: "/img/gallery-3.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-industrial-conveyor-belt-system-4892-large.mp4",
    websiteUrl: "#"
  },
  {
    id: 4,
    title: "Brand Website",
    subtitle: "Full Identity & System",
    tags: ["Branding", "Design System", "CMS"],
    imageUrl: "/img/gallery-4.webp",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-time-lapse-of-city-traffic-at-night-1940-large.mp4",
    websiteUrl: "#"
  }
];

const Project = () => {
  return (
    <section className="w-full min-h-screen py-32 px-6 md:px-12 bg-lightGray">
      
      {/* Header */}
      <div className="relative mb-12 flex flex-col items-center gap-5 max-w-7xl mx-auto text-center">
        <ScrambleHeader tagline="Projects" />
        <AnimatedTitle
          title="Our Selective Projects"
          className="special-font !text-4xl md:!text-6xl font-zentry font-black leading-[1]"
            textColor="text-mattBlack"
        />
        <p className="text-lightGray text-sm sm:text-base max-w-2xl mt-2">
          From creative portfolios to dynamic landing pages, we fuse design with development to create powerful brand-driven experiences.
        </p>
      </div>

      {/* Solutions Cards Container */}
      <div className="w-full max-w-full mx-auto">
        <SolutionsCards solutions={solutions} />
      </div>
    </section>
  );
};

export default Project;
