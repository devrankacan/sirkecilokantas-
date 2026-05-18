"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  nameTr: string;
  nameEn: string;
  descriptionTr?: string;
  descriptionEn?: string;
  price: number;
  image?: string;
  available: boolean;
  order: number;
}

interface Category {
  id: string;
  nameTr: string;
  nameEn: string;
  order: number;
  products: Product[];
}

export default function MenuPage() {
  const t = useTranslations("menu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  function toggleLocale() {
    const newLocale = locale === "tr" ? "en" : "tr";
    const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  }

  function handleImageError(productId: string) {
    setImageErrors((prev) => new Set(prev).add(productId));
  }

  const allProducts = categories.flatMap((c) => c.products);
  const displayProducts =
    selectedCategory === "all"
      ? allProducts
      : categories.find((c) => c.id === selectedCategory)?.products ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brown-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-700 font-serif text-lg">Yükleniyor…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-parchment-100/97 backdrop-blur border-b-2 border-brown-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-brown-900 leading-tight tracking-wide">
              {t("restaurantName")}
            </h1>
            <p className="text-xs text-brown-500 tracking-widest uppercase mt-0.5">
              {t("tagline")}
            </p>
          </div>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brown-400 hover:border-brown-700 hover:bg-parchment-200 text-sm text-brown-600 hover:text-brown-900 transition-all"
          >
            <span className="text-base">{locale === "tr" ? "🇬🇧" : "🇹🇷"}</span>
            <span className="font-medium">{locale === "tr" ? "EN" : "TR"}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-brown-900 py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-px bg-parchment-400 mx-auto mb-3" />
          <p className="text-parchment-300 text-xs tracking-[0.25em] uppercase font-light">
            1912
          </p>
          <p className="text-parchment-200 text-sm tracking-[0.15em] uppercase mt-1 font-serif">
            {t("title")}
          </p>
          <div className="w-24 h-px bg-parchment-400 mx-auto mt-3" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[69px] z-40 bg-parchment-200/97 backdrop-blur border-b border-brown-200">
        <div className="max-w-2xl mx-auto px-4 py-2.5">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                selectedCategory === "all"
                  ? "bg-brown-800 text-parchment-100 border-brown-800"
                  : "bg-transparent text-brown-700 border-brown-300 hover:bg-parchment-300 hover:border-brown-400"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-brown-800 text-parchment-100 border-brown-800"
                    : "bg-transparent text-brown-700 border-brown-300 hover:bg-parchment-300 hover:border-brown-400"
                }`}
              >
                {locale === "tr" ? cat.nameTr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {selectedCategory !== "all" ? (
          <section>
            {displayProducts.length === 0 ? (
              <div className="text-center py-16 text-brown-400">
                <p className="font-serif text-lg">{t("noProducts")}</p>
              </div>
            ) : (
              <div className="divide-y divide-parchment-300">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    t={t}
                    imageError={imageErrors.has(product.id)}
                    onImageError={() => handleImageError(product.id)}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          categories.map((cat) => (
            <section key={cat.id} className="mb-8">
              {/* Section header — PDF stilinde */}
              <div className="relative flex items-center gap-3 mb-4 py-2">
                <div className="flex-1 h-px bg-brown-300" />
                <h2 className="font-serif text-base text-brown-800 tracking-widest uppercase px-2">
                  {locale === "tr" ? cat.nameTr : cat.nameEn}
                </h2>
                <div className="flex-1 h-px bg-brown-300" />
              </div>
              {cat.products.length === 0 ? (
                <p className="text-brown-400 text-sm pl-1">{t("noProducts")}</p>
              ) : (
                <div className="divide-y divide-parchment-300">
                  {cat.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                      t={t}
                      imageError={imageErrors.has(product.id)}
                      onImageError={() => handleImageError(product.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-brown-800 bg-brown-900 mt-8 py-6 text-center">
        <p className="text-parchment-400 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} {t("restaurantName")}
        </p>
        <p className="text-brown-500 text-xs mt-1">
          Fiyatlarımıza %10 Servis Bedeli Eklenecektir · KDV Dahildir
        </p>
      </footer>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  locale: string;
  t: ReturnType<typeof useTranslations<"menu">>;
  imageError: boolean;
  onImageError: () => void;
}

function ProductCard({ product, locale, t, imageError, onImageError }: ProductCardProps) {
  const name = locale === "tr" ? product.nameTr : product.nameEn;
  const description =
    locale === "tr" ? product.descriptionTr : product.descriptionEn;

  return (
    <div
      className={`flex gap-4 py-4 transition-all ${
        !product.available ? "opacity-50" : ""
      }`}
    >
      {product.image && !imageError ? (
        <div className="relative flex-shrink-0 w-20 h-20 rounded overflow-hidden bg-parchment-200 border border-parchment-300">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
            onError={onImageError}
          />
        </div>
      ) : null}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-sm text-brown-900 leading-snug flex-1">
            {name}
          </h3>
          <span className="flex-shrink-0 font-semibold text-sm text-brown-800 whitespace-nowrap">
            {Number(product.price).toLocaleString("tr-TR")} TL
          </span>
        </div>
        {description && (
          <p className="text-brown-500 text-xs mt-1 leading-relaxed">
            {description}
          </p>
        )}
        {!product.available && (
          <span className="inline-block mt-1 text-xs text-brown-400 italic">
            {t("unavailable")}
          </span>
        )}
      </div>
    </div>
  );
}
