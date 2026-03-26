"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/Toast";

const TAG_OPTIONS = [
  { label: "For Sale", value: "FOR SALE", color: "bg-blue-600" },
  { label: "Featured", value: "FEATURED", color: "bg-blue-600" },
  { label: "New Construction", value: "NEW CONSTRUCTION", color: "bg-gray-800" },
];

const BADGE_OPTIONS = [
  { label: "Just Listed", value: "Just Listed", color: "text-blue-600" },
  { label: "Featured", value: "Featured", color: "text-blue-600" },
  { label: "Reduced", value: "Reduced", color: "text-red-500" },
  { label: "Open House", value: "Open House", color: "text-green-600" },
  { label: "2 days ago", value: "2 days ago", color: "text-gray-400" },
  { label: "3 days ago", value: "3 days ago", color: "text-gray-400" },
  { label: "1 week ago", value: "1 week ago", color: "text-gray-400" },
];

type FormData = {
  title: string;
  address: string;
  price: string;
  priceLabel: string;
  beds: string;
  baths: string;
  sqft: string;
  tag: string;
  tagColor: string;
  badge: string;
  badgeColor: string;
  image: string;
  listedDate: string;
};

const emptyForm: FormData = {
  title: "",
  address: "",
  price: "",
  priceLabel: "",
  beds: "",
  baths: "",
  sqft: "",
  tag: "FOR SALE",
  tagColor: "bg-blue-600",
  badge: "Just Listed",
  badgeColor: "text-blue-600",
  image: "",
  listedDate: new Date().toISOString().split("T")[0],
};

export default function AdminPropertyFormPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/properties/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          setForm({
            title: data.title,
            address: data.address,
            price: String(data.price),
            priceLabel: data.priceLabel,
            beds: String(data.beds),
            baths: String(data.baths),
            sqft: data.sqft,
            tag: data.tag,
            tagColor: data.tagColor,
            badge: data.badge,
            badgeColor: data.badgeColor,
            image: data.image,
            listedDate: data.listedDate,
          });
        })
        .catch(() => setError("Property not found"))
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-set tagColor when tag changes
      if (name === "tag") {
        const match = TAG_OPTIONS.find((t) => t.value === value);
        if (match) updated.tagColor = match.color;
      }

      // Auto-set badgeColor when badge changes
      if (name === "badge") {
        const match = BADGE_OPTIONS.find((b) => b.value === value);
        if (match) updated.badgeColor = match.color;
      }

      // Auto-generate priceLabel when price changes
      if (name === "price") {
        const num = parseInt(value);
        if (!isNaN(num)) {
          updated.priceLabel = `$${num.toLocaleString()}`;
        }
      }

      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      beds: Number(form.beds),
      baths: Number(form.baths),
    };

    try {
      const url = isNew ? "/api/properties" : `/api/properties/${id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      showToast(
        isNew
          ? "Property created successfully"
          : "Property updated successfully"
      );
      router.push("/admin/properties");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error && !isNew && !form.title) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Link
          href="/admin/properties"
          className="text-primary text-sm font-medium hover:underline"
        >
          Back to properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/properties"
            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? "Add New Property" : "Edit Property"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isNew
                ? "Fill in all fields to create a new listing."
                : `Editing property #${id}`}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {/* Basic Info */}
            <div className="p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Architectural Villa"
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="e.g. 42 Sunset Blvd, Los Angeles, CA"
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Specs */}
            <div className="p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Pricing & Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="1850000"
                    required
                    min={0}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Label
                  </label>
                  <input
                    type="text"
                    name="priceLabel"
                    value={form.priceLabel}
                    onChange={handleChange}
                    placeholder="$1,850,000"
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beds
                  </label>
                  <input
                    type="number"
                    name="beds"
                    value={form.beds}
                    onChange={handleChange}
                    placeholder="4"
                    required
                    min={0}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Baths
                  </label>
                  <input
                    type="number"
                    name="baths"
                    value={form.baths}
                    onChange={handleChange}
                    placeholder="3"
                    required
                    min={0}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Square Footage
                </label>
                <input
                  type="text"
                  name="sqft"
                  value={form.sqft}
                  onChange={handleChange}
                  placeholder="3,200"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary max-w-xs"
                />
              </div>
            </div>

            {/* Tags & Status */}
            <div className="p-6">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Tags & Status
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Tag
                  </label>
                  <select
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    {TAG_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Color (CSS class)
                  </label>
                  <input
                    type="text"
                    name="tagColor"
                    value={form.tagColor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Badge
                  </label>
                  <select
                    name="badge"
                    value={form.badge}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    {BADGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Badge Color (CSS class)
                  </label>
                  <input
                    type="text"
                    name="badgeColor"
                    value={form.badgeColor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Listed Date
                </label>
                <input
                  type="date"
                  name="listedDate"
                  value={form.listedDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary max-w-xs"
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <Link
              href="/admin/properties"
              className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 text-sm font-medium bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isNew
                ? "Create Property"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
