"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

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

const ITEMS_PER_PAGE = 6;

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 12h16a1 1 0 0 1 1 1v3H3v-3a1 1 0 0 1 1-1zM3 16v2M21 16v2M6 12V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v7" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  );
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [bedsBaths, setBedsBaths] = useState("all");

  // Debounced location value
  const [debouncedLocation, setDebouncedLocation] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLocation(location);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [location]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: ITEMS_PER_PAGE.toString(),
      sort: sortBy,
    });

    if (debouncedLocation.trim()) params.set("location", debouncedLocation.trim());
    if (priceRange !== "all") params.set("priceRange", priceRange);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (bedsBaths !== "all") params.set("bedsBaths", bedsBaths);

    try {
      const res = await fetch(`/api/properties?${params.toString()}`);
      const json = await res.json();
      setProperties(json.data);
      setPagination(json.pagination);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortBy, debouncedLocation, priceRange, propertyType, bedsBaths]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const { totalPages } = pagination;

  function getPaginationRange(): (number | "ellipsis")[] {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb & Title */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">
              Properties for Sale
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Luxury Listings
              </h1>
              <p className="text-gray-500 mt-1">
                Discover hand-picked premium properties across the country.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-gray-400 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18M6 12h12M9 18h6" />
                </svg>
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-sm font-semibold text-gray-900 bg-transparent outline-none cursor-pointer pr-1"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Los Angeles, CA"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="0-1000000">Under $1M</option>
                  <option value="1000000-2000000">$1M - $2M</option>
                  <option value="2000000-5000000">$2M - $5M</option>
                  <option value="5000000-999999999">$5M+</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="for sale">For Sale</option>
                  <option value="featured">Featured</option>
                  <option value="new construction">New Construction</option>
                </select>
              </div>

              {/* Beds & Baths */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Beds & Baths
                </label>
                <select
                  value={bedsBaths}
                  onChange={(e) => {
                    setBedsBaths(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
                >
                  <option value="all">Any</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>

              {/* More Filters Button */}
              <div className="flex items-end">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="h-56 sm:h-52 lg:h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No properties match your filters.
              </p>
              <button
                onClick={() => {
                  setLocation("");
                  setPriceRange("all");
                  setPropertyType("all");
                  setBedsBaths("all");
                  setCurrentPage(1);
                }}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Image */}
                  <div className="relative h-56 sm:h-52 lg:h-56">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    {/* Wishlist button */}
                    <button className="absolute top-4 left-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10">
                      <HeartIcon />
                    </button>

                    {/* Tag */}
                    <span
                      className={`absolute top-4 right-4 z-10 ${property.tagColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md`}
                    >
                      {property.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Price row */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl font-bold text-gray-900">
                        {property.priceLabel}
                      </span>
                      <span
                        className={`text-xs font-medium ${property.badgeColor}`}
                      >
                        {property.badge}
                      </span>
                    </div>

                    {/* Address */}
                    <p className="text-sm text-gray-500 mb-4">
                      {property.address}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <BedIcon />
                        {property.beds} Bed
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BathIcon />
                        {property.baths} Bath
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AreaIcon />
                        {property.sqft} sqft
                      </div>
                    </div>

                    {/* View Details button */}
                    <Link
                      href={`/properties/${property.id}`}
                      className="block w-full text-center py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-1.5">
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
              </button>

              {/* Page numbers */}
              {getPaginationRange().map((page, idx) =>
                page === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-10 h-10 flex items-center justify-center text-sm text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
