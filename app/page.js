import About from "@/components/About";
import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperience";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import BlogsSection from "@/components/BlogsSection";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Hero />
      <About />
      <WorkExperience />
      <Services />
      <FeaturedProjects />
      <BlogsSection />
    </div>
  );
};

export default page;
