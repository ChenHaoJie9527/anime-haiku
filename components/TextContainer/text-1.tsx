import { Code } from "lucide-react";
import { categoryColors } from "../../config";
import { useState } from "react";
interface Text1Props {
  title: string;
  description: string;
}
const Text1 = ({ title, description }: Text1Props) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="w-full  rounded-md bg-[#ffffff] text-black py-2 px-4 gap-4 flex flex-col">
      <header className="flex items-start justify-start flex-col gap-1">
        <h3 className={`text-2xl font-bold ${categoryColors.Text}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </header>
      <main className="flex items-center justify-center">
        <div className="w-full h-20 bg-[#e0e6ec] rounded-md"></div>
      </main>
      <footer
        className={`flex items-center justify-start gap-1 cursor-pointer ${categoryColors.Text}`}
        onClick={() => setShowCode(!showCode)}
      >
        <Code className={`w-4 h-4`} />
        <p className="text-sm">{showCode ? "Hide Code" : "Show Code"}</p>
      </footer>
    </div>
  );
};

export default Text1;
