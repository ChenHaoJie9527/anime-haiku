"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";

// 注册语言以减少包大小
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);

interface CodeSyntaxHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
}

const CodeSyntaxHighlighter = ({
  code,
  language,
  showLineNumbers = true,
  wrapLongLines = false,
}: CodeSyntaxHighlighterProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark}
      customStyle={{
        margin: 0,
        borderRadius: 0,
        background: "#0f0f0f",
        fontFamily: "var(--font-mono)", // 使用 Ubuntu Mono 字体
      }}
      showLineNumbers={showLineNumbers}
      wrapLongLines={wrapLongLines}
      codeTagProps={{
        style: {
          fontFamily: "var(--font-mono)", // 使用 Ubuntu Mono 字体
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSyntaxHighlighter;
