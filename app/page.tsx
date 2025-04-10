"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";
import { StartProjectOverlay } from "@/components/start-project-overlay";

const categories = Array.from(
  new Set(projectsData.map((project) => project.category))
);

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Text");
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false);

  const filteredProjects = projectsData.filter(
    (project) => project.category === selectedCategory
  );

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl tracking-tight">Anime.js v4 Showcase</h1>
        <p className="text-xl text-muted-foreground">
          Explore the power of anime.js with these interactive animation
          examples.
        </p>
        <Button
          size="lg"
          className="mt-4"
          onClick={() => setIsStartProjectOpen(true)}
        >
          Create Your Animation
        </Button>
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <StartProjectOverlay
        isOpen={isStartProjectOpen}
        onClose={() => setIsStartProjectOpen(false)}
      />
    </div>
  );
}
