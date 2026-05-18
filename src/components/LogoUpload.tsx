"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Props {
  locale: string;
  currentLogoUrl: string | null;
}

export default function LogoUpload({ locale, currentLogoUrl }: Props) {
  const [logoUrl, setLogoUrl] = useState<string | null>(currentLogoUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const res = await fetch("/api/admin/logo", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLogoUrl(data.logoUrl + "?t=" + Date.now());
    } catch {
      setError(locale === "tr" ? "Yükleme başarısız" : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    setUploading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/logo", { method: "DELETE" });
      if (!res.ok) throw new Error();
      setLogoUrl(null);
    } catch {
      setError(locale === "tr" ? "Silme başarısız" : "Remove failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="font-semibold text-gray-900 mb-4">
        {locale === "tr" ? "Restoran Logosu" : "Restaurant Logo"}
      </h2>

      <div className="flex items-center gap-6">
        <div
          className="relative w-40 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-amber-400 transition-colors overflow-hidden"
          onClick={() => inputRef.current?.click()}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Logo"
              fill
              className="object-contain p-2"
              sizes="160px"
            />
          ) : (
            <div className="text-center">
              <p className="text-2xl">🖼️</p>
              <p className="text-xs text-gray-400 mt-1">
                {locale === "tr" ? "Logo yükle" : "Upload logo"}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
          >
            {uploading
              ? locale === "tr" ? "Yükleniyor…" : "Uploading…"
              : logoUrl
              ? locale === "tr" ? "Logoyu Değiştir" : "Change Logo"
              : locale === "tr" ? "Logo Yükle" : "Upload Logo"}
          </button>

          {logoUrl && (
            <button
              onClick={handleRemove}
              disabled={uploading}
              className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors border border-red-200"
            >
              {locale === "tr" ? "Logoyu Kaldır" : "Remove Logo"}
            </button>
          )}

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <p className="text-xs text-gray-400">
            {locale === "tr"
              ? "PNG, JPG, SVG · Menü başlığında gösterilir"
              : "PNG, JPG, SVG · Shown in menu header"}
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
