import About from "@/components/About";
import Contact from "@/components/Contact";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WorkExperience from "@/components/WorkExperience";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <WorkExperience />
      <FeaturedProjects />
      <Contact />
    </main>
  );
}
