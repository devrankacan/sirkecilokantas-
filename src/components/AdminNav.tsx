"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavProps {
  locale: string;
}

export default function AdminNav({ locale }: AdminNavProps) {
  const pathname = usePathname();

  const navLinks = [
    {
      href: `/${locale}/admin/dashboard`,
      label: locale === "tr" ? "Dashboard" : "Dashboard",
      icon: "📊",
    },
    {
      href: `/${locale}/admin/categories`,
      label: locale === "tr" ? "Kategoriler" : "Categories",
      icon: "📂",
    },
    {
      href: `/${locale}/admin/products`,
      label: locale === "tr" ? "Ürünler" : "Products",
      icon: "🍽️",
    },
    {
      href: `/${locale}/admin/qr`,
      label: locale === "tr" ? "QR Kod" : "QR Code",
      icon: "📱",
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-900 mr-4 hidden sm:block">
              Sirkeci Lokantası
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span className="hidden sm:block">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/menu`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <span>🔗</span>
              <span className="hidden sm:block">{locale === "tr" ? "Menüyü Gör" : "View Menu"}</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span>
              <span className="hidden sm:block">{locale === "tr" ? "Çıkış" : "Logout"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
