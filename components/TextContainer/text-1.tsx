import { Code } from "lucide-react";
import { categoryColors } from "../../config";
import { useState, useEffect } from "react";
import { animate } from "animejs";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import CodeSyntaxHighlighter from "../CodeSyntaxHighlighter";
interface Text1Props {
  title: string;
  description: string;
}
const Text1 = ({ title, description }: Text1Props) => {
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState("js");
  const { toast } = useToast();
  const jsCode = `// 波浪文字动画实现
useEffect(() => {
  const textElement = document.getElementById("wave-text");
  if (textElement) {
    const text = textElement.textContent || "";
    textElement.textContent = "";
    
    text.split("").forEach((char, index) => {
      const charSpan = document.createElement("span");
      charSpan.className = "inline-block";
      charSpan.textContent = char === " " ? " " : char;
      textElement.appendChild(charSpan);

      animate(charSpan, {
        y: [0, -10, 0],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: index * 100,
        loop: true,
      });
    });
  }
}, []);`;

  const htmlCode = `<div class="wave-text-container">
  <p id="wave-text" class="text-4xl font-bold">
    WAVE TEXT
  </p>
</div>`;

  const copyCode = () => {
    const textToCopy = activeTab === "js" ? jsCode : htmlCode;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("复制成功");
        toast({
          title: "代码已复制到剪贴板",
          variant: "success",
          position: "top-center",
        });
      })
      .catch((err) => console.error("复制失败:", err));
  };

  useEffect(() => {
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
  }, []);
  return (
    <div className="w-full  rounded-md bg-[#ffffff] text-black py-2 px-4 gap-4 flex flex-col">
      <header className="flex items-start justify-start flex-col gap-1">
        <h3 className={cn("text-2xl font-[900]", categoryColors.Text)}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </header>
      <main className="flex items-center justify-center">
        <div className="w-full h-24 bg-[#0d0d0d] rounded-md flex items-center justify-center">
          <p
            id="wave-text"
            className={cn("text-4xl font-[900]", categoryColors.Text)}
          >
            WAVE TEXT
          </p>
        </div>
      </main>
      <footer className={cn("flex gap-1  flex-col", categoryColors.Text)}>
        <div
          className="flex items-center cursor-pointer justify-start gap-1"
          onClick={() => setShowCode(!showCode)}
        >
          <Code className={`w-4 h-4`} />
          <p className="text-sm">{showCode ? "Hide Code" : "Show Code"}</p>
        </div>
        {/* 需要展示具体代码 需要添加滚动 */}
        {showCode && (
          <div className="w-full mt-2 bg-[#0f0f0f] rounded-md  overflow-hidden">
            <div className="flex border-b">
              <div
                className={`px-4 py-2 cursor-pointer ${
                  activeTab === "html"
                    ? `bg-[#0f0f0f] ${categoryColors.Text}`
                    : `text-gray-600 ${categoryColors.Text}`
                }`}
                onClick={() => setActiveTab("html")}
              >
                html
              </div>
              <div
                className={`px-4 py-2 cursor-pointer ${
                  activeTab === "js"
                    ? `bg-[#0f0f0f] ${categoryColors.Text}`
                    : `text-gray-600 ${categoryColors.Text}`
                }`}
                onClick={() => setActiveTab("js")}
              >
                js
              </div>
              <div className="ml-auto">
                <button
                  className={cn("px-4 py-2 rounded-md", categoryColors.Text)}
                  onClick={copyCode}
                >
                  复制
                </button>
              </div>
            </div>
            <div className="p-3 overflow-auto h-full max-h-[300px]">
              <CodeSyntaxHighlighter
                code={activeTab === "js" ? jsCode : htmlCode}
                language={activeTab === "js" ? "javascript" : "html"}
              />
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Text1;
