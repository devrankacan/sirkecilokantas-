"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Category {
  id: string;
  nameTr: string;
  nameEn: string;
}

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
  categoryId: string;
  category?: Category;
}

const EMPTY_FORM = {
  nameTr: "",
  nameEn: "",
  descriptionTr: "",
  descriptionEn: "",
  price: "",
  image: "",
  available: true,
  order: 0,
  categoryId: "",
};

interface ProductsClientProps {
  locale: string;
}

export default function ProductsClient({ locale }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const label = (key: string) =>
    locale === "tr"
      ? ({
          title: "Ürünler",
          add: "Ürün Ekle",
          edit: "Düzenle",
          delete: "Sil",
          save: "Kaydet",
          cancel: "İptal",
          nameTr: "İsim (TR)",
          nameEn: "İsim (EN)",
          descTr: "Açıklama (TR)",
          descEn: "Açıklama (EN)",
          price: "Fiyat (₺)",
          image: "Resim URL",
          available: "Mevcut",
          order: "Sıra",
          category: "Kategori",
          deleteConfirm: "Bu ürünü silmek istediğinizden emin misiniz?",
          noData: "Henüz ürün yok",
          loading: "Yükleniyor...",
          actions: "İşlemler",
          allCategories: "Tüm Kategoriler",
          selectCategory: "Kategori seçin",
        } as Record<string, string>)[key] ?? key
      : ({
          title: "Products",
          add: "Add Product",
          edit: "Edit",
          delete: "Delete",
          save: "Save",
          cancel: "Cancel",
          nameTr: "Name (TR)",
          nameEn: "Name (EN)",
          descTr: "Description (TR)",
          descEn: "Description (EN)",
          price: "Price (₺)",
          image: "Image URL",
          available: "Available",
          order: "Order",
          category: "Category",
          deleteConfirm: "Are you sure you want to delete this product?",
          noData: "No products yet",
          loading: "Loading...",
          actions: "Actions",
          allCategories: "All Categories",
          selectCategory: "Select category",
        } as Record<string, string>)[key] ?? key;

  const fetchData = useCallback(async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);
      if (prodRes.ok) setProducts(await prodRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function openAdd() {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      categoryId: categories[0]?.id ?? "",
    });
    setError("");
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      nameTr: p.nameTr,
      nameEn: p.nameEn,
      descriptionTr: p.descriptionTr ?? "",
      descriptionEn: p.descriptionEn ?? "",
      price: String(p.price),
      image: p.image ?? "",
      available: p.available,
      order: p.order,
      categoryId: p.categoryId,
    });
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nameTr.trim() || !form.nameEn.trim() || !form.categoryId) {
      setError(locale === "tr" ? "Zorunlu alanları doldurun" : "Fill required fields");
      return;
    }
    const priceNum = parseFloat(form.price as string);
    if (isNaN(priceNum) || priceNum < 0) {
      setError(locale === "tr" ? "Geçerli bir fiyat girin" : "Enter a valid price");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const url = editingId
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: priceNum }),
      });

      if (res.ok) {
        await fetchData();
        closeForm();
      } else {
        const data = await res.json();
        setError(data.error || "Error saving");
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(label("deleteConfirm"))) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) await fetchData();
    } catch {
      setError("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  const filtered =
    filterCategory === "all"
      ? products
      : products.filter((p) => p.categoryId === filterCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{label("title")}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} {locale === "tr" ? "ürün" : "products"}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <span>+</span> {label("add")}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory("all")}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filterCategory === "all"
              ? "bg-amber-600 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {label("allCategories")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterCategory === cat.id
                ? "bg-amber-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {locale === "tr" ? cat.nameTr : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 my-4">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              {editingId
                ? locale === "tr" ? "Ürün Düzenle" : "Edit Product"
                : locale === "tr" ? "Ürün Ekle" : "Add Product"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {label("nameTr")} *
                  </label>
                  <input
                    type="text"
                    value={form.nameTr}
                    onChange={(e) => setForm({ ...form, nameTr: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                    placeholder="Türkçe isim"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {label("nameEn")} *
                  </label>
                  <input
                    type="text"
                    value={form.nameEn}
                    onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                    placeholder="English name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {label("descTr")}
                </label>
                <textarea
                  value={form.descriptionTr}
                  onChange={(e) => setForm({ ...form, descriptionTr: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {label("descEn")}
                </label>
                <textarea
                  value={form.descriptionEn}
                  onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {label("price")} *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {label("order")}
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {label("category")} *
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 bg-white"
                >
                  <option value="">{label("selectCategory")}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {locale === "tr" ? cat.nameTr : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {label("image")}
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) => setForm({ ...form, available: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">{label("available")}</span>
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {label("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  {label("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-500">{label("loading")}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">
          <p className="text-4xl mb-3">🍽️</p>
          <p>{label("noData")}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl border shadow-sm p-4 flex gap-3 ${
                product.available ? "border-gray-200" : "border-gray-200 opacity-70"
              }`}
            >
              {product.image ? (
                <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.nameTr}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={() => {}}
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                  🍽️
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {locale === "tr" ? product.nameTr : product.nameEn}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {product.category
                        ? locale === "tr"
                          ? product.category.nameTr
                          : product.category.nameEn
                        : "—"}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      product.available
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.available
                      ? locale === "tr" ? "Mevcut" : "Available"
                      : locale === "tr" ? "Yok" : "N/A"}
                  </span>
                </div>
                <p className="text-amber-700 font-semibold text-sm mt-1">
                  ₺{Number(product.price).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button
                  onClick={() => openEdit(product)}
                  className="px-2.5 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                >
                  {label("edit")}
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {deletingId === product.id ? "..." : label("delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
