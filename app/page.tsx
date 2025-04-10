"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";
import { StartProjectOverlay } from "@/components/start-project-overlay";
import { Category } from "@/config";
import TextContainer from "@/components/TextContainer";



export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Text");
  const [isStartProjectOpen, setIsStartProjectOpen] = useState(false);
  const categories = Array.from(
    new Set(projectsData.map((project) => project.category))
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
        categories={categories as Category[]}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedCategory === "Text" && <TextContainer />}
        {selectedCategory === "Path" && <div>Path</div>}
        {selectedCategory === "Time" && <div>Time</div>}
        {selectedCategory === "Draggable" && <div>Draggable</div>}
        {selectedCategory === "Logo" && <div>Logo</div>}
      </div>
      <StartProjectOverlay
        isOpen={isStartProjectOpen}
        onClose={() => setIsStartProjectOpen(false)}
      />
    </div>
  );
}
