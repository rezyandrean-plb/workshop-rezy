"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/Toast";

type Property = {
  id: number;
  title: string;
  address: string;
  price: number;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
  tagColor: string;
  badge: string;
  badgeColor: string;
  image: string;
  listedDate: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function AdminPropertiesPage() {
  const { showToast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: "10",
      sort: "latest",
    });
    if (debouncedSearch.trim()) params.set("location", debouncedSearch.trim());

    try {
      const res = await fetch(`/api/properties?${params.toString()}`);
      const json = await res.json();
      setProperties(json.data);
      setPagination(json.pagination);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this property?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Property deleted successfully");
        fetchProperties();
      } else {
        showToast("Failed to delete property", "error");
      }
    } catch {
      showToast("Failed to delete property", "error");
    } finally {
      setDeletingId(null);
    }
  }

  const { totalPages } = pagination;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Manage Properties
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {pagination.total} total properties
            </p>
          </div>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Property
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by address..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-5 py-3">
                    Property
                  </th>
                  <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-5 py-3 hidden md:table-cell">
                    Price
                  </th>
                  <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-5 py-3 hidden lg:table-cell">
                    Details
                  </th>
                  <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-5 py-3 hidden sm:table-cell">
                    Tag
                  </th>
                  <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-5 py-3 hidden lg:table-cell">
                    Listed
                  </th>
                  <th className="text-right font-semibold text-gray-500 uppercase text-xs tracking-wider px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-5 py-4" colSpan={6}>
                        <div className="h-10 bg-gray-100 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : properties.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-gray-400"
                    >
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Property */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0">
                            <Image
                              src={property.image}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate max-w-[200px]">
                              {property.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[200px]">
                              {property.address}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="font-semibold text-gray-900">
                          {property.priceLabel}
                        </span>
                      </td>

                      {/* Details */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-gray-500">
                          {property.beds}bd / {property.baths}ba /{" "}
                          {property.sqft} sqft
                        </span>
                      </td>

                      {/* Tag */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${property.tagColor} text-white`}
                        >
                          {property.tag}
                        </span>
                      </td>

                      {/* Listed */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-gray-400 text-xs">
                          {property.listedDate}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/properties/${property.id}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors px-2.5 py-1.5 rounded-md hover:bg-blue-50"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(property.id)}
                            disabled={deletingId === property.id}
                            className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 transition-colors px-2.5 py-1.5 rounded-md hover:bg-red-50 disabled:opacity-50"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            {deletingId === property.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Page {currentPage} of {totalPages} ({pagination.total} results)
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
