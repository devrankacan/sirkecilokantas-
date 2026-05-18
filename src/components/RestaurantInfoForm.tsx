"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Wifi, Save } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-600">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

interface Info {
  address?: string;
  phone?: string;
  hours?: string;
  wifi?: string;
  instagram?: string;
}

interface Props {
  locale: string;
  initialInfo: Info;
}

export default function RestaurantInfoForm({ locale, initialInfo }: Props) {
  const [info, setInfo] = useState<Info>(initialInfo);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: keyof Info, val: string) {
    setInfo((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/restaurant-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
    } catch {
      setError(locale === "tr" ? "Kaydedilemedi" : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const fields: { key: keyof Info; label: string; icon: React.ReactNode; placeholder: string; multiline?: boolean }[] = [
    {
      key: "address",
      label: locale === "tr" ? "Adres" : "Address",
      icon: <MapPin size={15} className="text-brown-600" />,
      placeholder: "Sirkeci Mah. Hüdavendigar Cad. No:1 Fatih/İstanbul",
      multiline: true,
    },
    {
      key: "phone",
      label: locale === "tr" ? "Telefon" : "Phone",
      icon: <Phone size={15} className="text-brown-600" />,
      placeholder: "+90 212 000 00 00",
    },
    {
      key: "hours",
      label: locale === "tr" ? "Çalışma Saatleri" : "Working Hours",
      icon: <Clock size={15} className="text-brown-600" />,
      placeholder: "Pzt–Cum: 09:00–22:00\nCmt–Pzr: 10:00–23:00",
      multiline: true,
    },
    {
      key: "wifi",
      label: "Wi-Fi",
      icon: <Wifi size={15} className="text-brown-600" />,
      placeholder: "sirkeci1912",
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: <InstagramIcon size={15} />,
      placeholder: "@sirkecilokantasi",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="font-semibold text-gray-900 mb-5">
        {locale === "tr" ? "Restoran Bilgileri" : "Restaurant Info"}
      </h2>

      <div className="flex flex-col gap-4">
        {fields.map(({ key, label, icon, placeholder, multiline }) => (
          <div key={key}>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              {icon}
              {label}
            </label>
            {multiline ? (
              <textarea
                rows={2}
                value={info[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            ) : (
              <input
                type="text"
                value={info[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
        >
          <Save size={14} />
          {saving
            ? locale === "tr" ? "Kaydediliyor…" : "Saving…"
            : locale === "tr" ? "Kaydet" : "Save"}
        </button>
        {saved && (
          <span className="text-sm text-emerald-600">
            {locale === "tr" ? "Kaydedildi ✓" : "Saved ✓"}
          </span>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
}
