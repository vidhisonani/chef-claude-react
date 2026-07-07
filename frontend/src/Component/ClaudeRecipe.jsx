import ReactMarkdown from "react-markdown";
import { Copy, FileDown, ImageDown, Check } from 'lucide-react';
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";

export default function ClaudeRecipe(props) {
  const [copied, setCopied] = useState(false);
  const recipeRef = useRef(null);

  function copyRecipe() {
    navigator.clipboard.writeText(props.recipe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function saveAsImage() {
    const canvas = await html2canvas(recipeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: 700,
      windowWidth: 700,
    });
    const link = document.createElement("a");
    link.download = "recipe.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const handlePrint = useReactToPrint({
    contentRef: recipeRef,
    documentTitle: "Recipe",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          font-family: Inter, sans-serif;
          color: #2d3748;
          font-size: 14px;
          line-height: 1.6;
        }
        h1, h2, h3 {
          color: #1a202c;
          font-weight: 700;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        h2 { font-size: 22px; }
        h3 { font-size: 16px; }
        p  { margin-bottom: 8px; }
        ul, ol { padding-left: 20px; margin-bottom: 12px; }
        ul{ list-style-type: disc;}
        ol{ list-style-type: decimal;}
        li { margin-bottom: 6px; }
        strong { font-weight: 600; }
      }
    `,
  });

  return (
    <section aria-live="polite" className="recipe-content">
      <h2 className="text-headfont">Chef Claude Recommendation:</h2>
      <div ref={recipeRef} className="bg-white p-4 rounded-md">
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-200">
        <button
          onClick={copyRecipe}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-recipe-bg text-slate-600 hover:bg-slate-200 transition-colors duration-200 cursor-pointer"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Recipe"}
        </button>
        <button
          onClick={saveAsImage}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-recipe-bg text-slate-600 hover:bg-slate-200 transition-colors duration-200 cursor-pointer"
        >
          <ImageDown size={16} />
          Save as Image
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-terracotta text-offwhite hover:bg-terracotta-hover transition-colors duration-200 cursor-pointer"
        >
          <FileDown size={16} />
          Download PDF
        </button>
      </div>
    </section>
  );
}