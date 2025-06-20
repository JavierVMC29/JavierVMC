import ContactPage from "@/components/pages/contact";
import HomeHero from "@/components/pages/home/hero";
import HomeSkils from "@/components/pages/home/skills";
import ProjectsPage from "@/components/pages/projects";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <HomeSkils />
      <ProjectsPage />
      <ContactPage className="theme-background !h-auto"/>
    </div>
  );
}
