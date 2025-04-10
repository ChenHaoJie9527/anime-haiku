import { Code } from "lucide-react";
import { categoryColors } from "../../config";
import { useState, useEffect, useRef } from "react";
import { animate, createScope, Scope, stagger } from "animejs";
import { cn } from "@/lib/utils";
interface Text1Props {
  title: string;
  description: string;
}
const Text1 = ({ title, description }: Text1Props) => {
  const [showCode, setShowCode] = useState(false);
  const scope = useRef<Scope | null>(null);
  const root = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (root.current) {
      // 先将文本分割成单独的字母元素
      const textElement = document.getElementById("wave-text");
      if (textElement) {
        const text = textElement.textContent || "";
        
        // 清空原内容并创建新元素
        textElement.textContent = "";
        
        // 为每个字符创建独立的span元素和动画
        text.split("").forEach((char, index) => {
          const charSpan = document.createElement("span");
          charSpan.className = "inline-block";
          charSpan.textContent = char === " " ? " " : char;
          textElement.appendChild(charSpan);
          
          // 为每个字符单独创建动画实例
          animate(charSpan, {
            y: [0, -10, 0],
            easing: "easeInOutQuad",
            duration: 1000,
            delay: index * 100, // 初始延迟
            loop: true,
          });
        });
      }
    }
  }, []);
  return (
    <div className="w-full  rounded-md bg-[#ffffff] text-black py-2 px-4 gap-4 flex flex-col">
      <header className="flex items-start justify-start flex-col gap-1">
        <h3 className={cn("text-2xl font-[900]", categoryColors.Text)}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </header>
      <main className="flex items-center justify-center" ref={root}>
        <div className="w-full h-24 bg-[#0d0d0d] rounded-md flex items-center justify-center">
          <p
            id="wave-text"
            className={cn("text-4xl font-[900]", categoryColors.Text)}
          >
            WAVE TEXT
          </p>
        </div>
      </main>
      <footer
        className={cn(
          "flex items-center justify-start gap-1 cursor-pointer",
          categoryColors.Text
        )}
        onClick={() => setShowCode(!showCode)}
      >
        <Code className={`w-4 h-4`} />
        <p className="text-sm">{showCode ? "Hide Code" : "Show Code"}</p>
      </footer>
    </div>
  );
};

export default Text1;
