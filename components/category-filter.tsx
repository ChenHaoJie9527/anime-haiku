"use client";

import { Button } from "@/components/ui/button";
import { Category, categoryIcons } from "@/config/index";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {[...categories].map((category, index) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons];
        return (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn("rounded-full px-3 py-1 text-sm")}
            onClick={() => onCategoryChange(category)}
          >
            {Icon && <Icon />}
            <span>{category}</span>
          </Button>
        );
      })}
    </div>
  );
}
