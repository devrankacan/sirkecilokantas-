"use client";

import { useState, useEffect, useCallback } from "react";

interface Category {
  id: string;
  nameTr: string;
  nameEn: string;
  order: number;
  _count?: { products: number };
}

interface CategoriesClientProps {
  locale: string;
}

const EMPTY_FORM = { nameTr: "", nameEn: "", order: 0 };

export default function CategoriesClient({ locale }: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const tr = (key: string) =>
    locale === "tr"
      ? {
          title: "Kategoriler",
          add: "Kategori Ekle",
          edit: "Düzenle",
          delete: "Sil",
          save: "Kaydet",
          cancel: "İptal",
          nameTr: "İsim (TR)",
          nameEn: "İsim (EN)",
          order: "Sıra",
          products: "ürün",
          deleteConfirm: "Bu kategoriyi silmek istediğinizden emin misiniz?",
          noData: "Henüz kategori yok",
          loading: "Yükleniyor...",
          actions: "İşlemler",
        }[key] ?? key
      : {
          title: "Categories",
          add: "Add Category",
          edit: "Edit",
          delete: "Delete",
          save: "Save",
          cancel: "Cancel",
          nameTr: "Name (TR)",
          nameEn: "Name (EN)",
          order: "Order",
          products: "products",
          deleteConfirm: "Are you sure you want to delete this category?",
          noData: "No categories yet",
          loading: "Loading...",
          actions: "Actions",
        }[key] ?? key;

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowForm(true);
  }

  function openEdit(cat: Category) {
    setEditingId(cat.id);
    setForm({ nameTr: cat.nameTr, nameEn: cat.nameEn, order: cat.order });
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
    if (!form.nameTr.trim() || !form.nameEn.trim()) {
      setError(locale === "tr" ? "Tüm alanları doldurun" : "Fill all fields");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const url = editingId
        ? `/api/admin/categories/${editingId}`
        : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        await fetchCategories();
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
    if (!confirm(tr("deleteConfirm"))) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCategories();
      }
    } catch {
      setError("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tr("title")}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {categories.length}{" "}
            {locale === "tr" ? "kategori" : "categories"}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <span>+</span> {tr("add")}
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              {editingId
                ? locale === "tr" ? "Kategori Düzenle" : "Edit Category"
                : locale === "tr" ? "Kategori Ekle" : "Add Category"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tr("nameTr")}
                </label>
                <input
                  type="text"
                  value={form.nameTr}
                  onChange={(e) => setForm({ ...form, nameTr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="Örn: Ana Yemekler"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tr("nameEn")}
                </label>
                <input
                  type="text"
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  placeholder="e.g. Main Courses"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tr("order")}
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                />
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
                  {tr("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  {tr("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-gray-500">{tr("loading")}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">
          <p className="text-4xl mb-3">📂</p>
          <p>{tr("noData")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-3">
                  {tr("nameTr")}
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                  {tr("nameEn")}
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                  {tr("order")}
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                  {tr("products")}
                </th>
                <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-3">
                  {tr("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900 text-sm">
                    {cat.nameTr}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-sm hidden sm:table-cell">
                    {cat.nameEn}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm hidden md:table-cell">
                    {cat.order}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm hidden md:table-cell">
                    {cat._count?.products ?? 0}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(cat)}
                        className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        {tr("edit")}
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        disabled={deletingId === cat.id}
                        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === cat.id ? "..." : tr("delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
