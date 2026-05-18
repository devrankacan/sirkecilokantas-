"use client";

import { useState, useEffect } from "react";

interface QRDisplayProps {
  menuUrl: string;
  locale: string;
}

export default function QRDisplay({ menuUrl, locale }: QRDisplayProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fullMenuUrl, setFullMenuUrl] = useState(menuUrl);

  useEffect(() => {
    const full = `${window.location.origin}${fullMenuUrl}`;
    setFullMenuUrl(full);
    async function loadQR() {
      try {
        const res = await fetch(`/api/qr?url=${encodeURIComponent(full)}`);
        if (res.ok) {
          const text = await res.text();
          setSvgContent(text);
        }
      } catch (e) {
        console.error("Failed to load QR", e);
      } finally {
        setLoading(false);
      }
    }
    loadQR();
  }, [menuUrl]);

  function downloadSVG() {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sirkeci-lokantas-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-md">
      <div className="text-center">
        {loading ? (
          <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : svgContent ? (
          <div
            className="w-48 h-48 mx-auto mb-4 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-400">
            QR Error
          </div>
        )}

        <p className="text-sm text-gray-500 mb-1">
          {locale === "tr" ? "Menü URL:" : "Menu URL:"}
        </p>
        <p className="text-xs text-amber-700 font-mono break-all mb-6">{fullMenuUrl}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={downloadSVG}
            disabled={!svgContent}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ⬇ {locale === "tr" ? "SVG İndir" : "Download SVG"}
          </button>
          <a
            href={fullMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            🔗 {locale === "tr" ? "Önizle" : "Preview"}
          </a>
        </div>
      </div>
    </div>
  );
}
