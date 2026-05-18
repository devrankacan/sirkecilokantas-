"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Clock, Wifi, ChevronDown, X } from "lucide-react";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  info: Info;
  logoUrl: string | null;
  restaurantName: string;
}

export default function RestaurantInfoDropdown({ info, logoUrl, restaurantName }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const hasAny = Object.values(info).some(Boolean);
  if (!hasAny && !logoUrl) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brown-400 hover:border-brown-700 hover:bg-parchment-200 text-sm text-brown-600 hover:text-brown-900 transition-all"
      >
        <span className="font-medium text-xs tracking-wide">Bilgi</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-parchment-300 overflow-hidden z-50">
          {/* Header */}
          <div className="bg-brown-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo" className="h-8 w-auto max-w-[100px] object-contain" />
              ) : (
                <span className="text-parchment-100 font-serif text-sm tracking-wide">
                  {restaurantName}
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-parchment-400 hover:text-parchment-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Info rows */}
          <div className="divide-y divide-parchment-200">
            {info.address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(info.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 px-4 py-3 hover:bg-parchment-50 transition-colors group"
              >
                <div className="mt-0.5 w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors">
                  <MapPin size={15} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-brown-400 font-medium uppercase tracking-wider mb-0.5">Adres</p>
                  <p className="text-sm text-brown-800 leading-snug">{info.address}</p>
                </div>
              </a>
            )}

            {info.phone && (
              <a
                href={`tel:${info.phone}`}
                className="flex items-start gap-3 px-4 py-3 hover:bg-parchment-50 transition-colors group"
              >
                <div className="mt-0.5 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <Phone size={15} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-brown-400 font-medium uppercase tracking-wider mb-0.5">Telefon</p>
                  <p className="text-sm text-brown-800">{info.phone}</p>
                </div>
              </a>
            )}

            {info.hours && (
              <div className="flex items-start gap-3 px-4 py-3">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Clock size={15} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-brown-400 font-medium uppercase tracking-wider mb-0.5">Çalışma Saatleri</p>
                  <p className="text-sm text-brown-800 whitespace-pre-line leading-snug">{info.hours}</p>
                </div>
              </div>
            )}

            {info.wifi && (
              <div className="flex items-start gap-3 px-4 py-3">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Wifi size={15} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-brown-400 font-medium uppercase tracking-wider mb-0.5">Wi-Fi Şifresi</p>
                  <p className="text-sm text-brown-800 font-mono tracking-wide">{info.wifi}</p>
                </div>
              </div>
            )}

            {info.instagram && (
              <a
                href={`https://instagram.com/${info.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 px-4 py-3 hover:bg-parchment-50 transition-colors group"
              >
                <div className="mt-0.5 w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0 group-hover:from-purple-100 group-hover:to-pink-100 transition-colors text-pink-500">
                  <InstagramIcon size={15} />
                </div>
                <div>
                  <p className="text-xs text-brown-400 font-medium uppercase tracking-wider mb-0.5">Instagram</p>
                  <p className="text-sm text-brown-800">
                    {info.instagram.startsWith("@") ? info.instagram : `@${info.instagram}`}
                  </p>
                </div>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
