"use client";

import { useState, useRef } from "react";

interface Props {
  locale: string;
  currentLogoUrl: string | null;
  currentCoverUrls: string[];
}

export default function LogoUpload({ locale, currentLogoUrl, currentCoverUrls }: Props) {
  const [logoUrl, setLogoUrl] = useState<string | null>(currentLogoUrl);
  const [coverUrls, setCoverUrls] = useState<string[]>(currentCoverUrls);
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [coverError, setCoverError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    setLogoError(null);
    const formData = new FormData();
    formData.append("logo", file);
    try {
      const res = await fetch("/api/admin/logo", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLogoUrl(data.logoUrl + "?t=" + Date.now());
    } catch {
      setLogoError(locale === "tr" ? "Yükleme başarısız" : "Upload failed");
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleLogoRemove() {
    setLogoUploading(true);
    setLogoError(null);
    try {
      const res = await fetch("/api/admin/logo", { method: "DELETE" });
      if (!res.ok) throw new Error();
      setLogoUrl(null);
    } catch {
      setLogoError(locale === "tr" ? "Silme başarısız" : "Remove failed");
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    setCoverError(null);
    const formData = new FormData();
    formData.append("cover", file);
    try {
      const res = await fetch("/api/admin/cover", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCoverUrls(data.coverUrls);
    } catch {
      setCoverError(locale === "tr" ? "Yükleme başarısız" : "Upload failed");
    } finally {
      setCoverUploading(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  }

  async function handleCoverRemove(url: string) {
    setCoverUploading(true);
    setCoverError(null);
    try {
      const res = await fetch("/api/admin/cover", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCoverUrls(data.coverUrls);
    } catch {
      setCoverError(locale === "tr" ? "Silme başarısız" : "Remove failed");
    } finally {
      setCoverUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Logo */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">
          {locale === "tr" ? "Restoran Logosu" : "Restaurant Logo"}
        </h2>
        <div className="flex items-center gap-6">
          <div
            className="w-40 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-amber-400 transition-colors overflow-hidden"
            onClick={() => logoInputRef.current?.click()}
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
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
              onClick={() => logoInputRef.current?.click()}
              disabled={logoUploading}
              className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
            >
              {logoUploading
                ? locale === "tr" ? "Yükleniyor…" : "Uploading…"
                : logoUrl
                ? locale === "tr" ? "Logoyu Değiştir" : "Change Logo"
                : locale === "tr" ? "Logo Yükle" : "Upload Logo"}
            </button>
            {logoUrl && (
              <button
                onClick={handleLogoRemove}
                disabled={logoUploading}
                className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors border border-red-200"
              >
                {locale === "tr" ? "Logoyu Kaldır" : "Remove Logo"}
              </button>
            )}
            {logoError && <p className="text-red-500 text-xs">{logoError}</p>}
            <p className="text-xs text-gray-400">
              {locale === "tr" ? "PNG, JPG, SVG · Menü başlığında gösterilir" : "PNG, JPG, SVG · Shown in menu header"}
            </p>
          </div>
        </div>
        <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
      </div>

      {/* Kapak Slider Görselleri */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-1">
          {locale === "tr" ? "Kapak Slider Görselleri" : "Cover Slider Images"}
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          {locale === "tr"
            ? "Birden fazla görsel yükleyebilirsiniz — menüde otomatik kayar"
            : "Upload multiple images — they auto-slide on the menu"}
        </p>

        {coverUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {coverUrls.map((url, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-24 object-cover" />
                <button
                  onClick={() => handleCoverRemove(url)}
                  disabled={coverUploading}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => coverInputRef.current?.click()}
          disabled={coverUploading}
          className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
        >
          {coverUploading
            ? locale === "tr" ? "Yükleniyor…" : "Uploading…"
            : locale === "tr" ? "+ Görsel Ekle" : "+ Add Image"}
        </button>

        {coverError && <p className="text-red-500 text-xs mt-2">{coverError}</p>}
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
      </div>
    </div>
  );
}
