import TextIcon from "@/components/icons/TextIcon";
import PathIcon from "@/components/icons/PathIcon";
import { Type } from "lucide-react";
import TimerIcon from "@/components/icons/TimerIcon";
import HandIcon from "@/components/icons/HandIcon";
import SlackIcon from "@/components/icons/SlackIcon";

export const categoryIcons = {
  All: Type,
  Text: TextIcon,
  Path: PathIcon,
  Time: TimerIcon,
  Draggable: HandIcon,
  Logo: SlackIcon,
};

export const categoryColors = {
  All: "text-blue-400",
  Text: "text-purple-400",
  Path: "text-green-400",
  Time: "text-cyan-400",
  Draggable: "text-pink-400",
  Logo: "text-red-400",
};

export function getCategoryColor(category: Category) {
  return categoryColors[category];
}

export type Category = "All" | "Text" | "Path" | "Time" | "Draggable" | "Logo";
