import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = { id: string };

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) notFound();

  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, numId))
    .limit(1);

  if (!property) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/properties"
              className="hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <span>/</span>
            <span className="text-gray-600 font-medium truncate max-w-[200px]">
              {property.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span
                className={`${property.tagColor} text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg`}
              >
                {property.tag}
              </span>
              <span
                className={`bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-lg ${property.badgeColor}`}
              >
                {property.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left — Main info */}
            <div className="lg:col-span-2">
              {/* Title & Address */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm">{property.address}</span>
                </div>
              </div>

              {/* Stats bar */}
              <div className="flex flex-wrap items-center gap-6 py-5 border-y border-gray-100 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.beds}
                    </p>
                    <p className="text-xs text-gray-400">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 12h16a1 1 0 0 1 1 1v3H3v-3a1 1 0 0 1 1-1zM3 16v2M21 16v2M6 12V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.baths}
                    </p>
                    <p className="text-xs text-gray-400">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 3v18" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.sqft}
                    </p>
                    <p className="text-xs text-gray-400">Square Feet</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.listedDate}
                    </p>
                    <p className="text-xs text-gray-400">Listed Date</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  About This Property
                </h2>
                <div className="text-gray-500 leading-relaxed space-y-4">
                  <p>
                    Welcome to {property.title}, a stunning property located at{" "}
                    {property.address}. This exceptional home features{" "}
                    {property.beds} spacious bedrooms and {property.baths}{" "}
                    beautifully appointed bathrooms, spanning {property.sqft}{" "}
                    square feet of thoughtfully designed living space.
                  </p>
                  <p>
                    Every detail of this residence has been carefully considered,
                    from the premium finishes to the open-concept layout that
                    seamlessly blends indoor and outdoor living. The gourmet
                    kitchen features top-of-the-line appliances, custom
                    cabinetry, and a large center island perfect for
                    entertaining.
                  </p>
                  <p>
                    The primary suite offers a private retreat with a spa-like
                    bathroom, walk-in closet, and serene views. Additional
                    highlights include smart home technology, energy-efficient
                    systems, and professionally landscaped grounds.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Property Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {[
                    "Central Air Conditioning",
                    "Hardwood Floors",
                    "Gourmet Kitchen",
                    "Walk-in Closets",
                    "Smart Home Technology",
                    "Two-Car Garage",
                    "Energy Efficient",
                    "Professional Landscaping",
                    "In-unit Laundry",
                    "Outdoor Patio",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <svg
                        className="w-4 h-4 text-primary shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Sidebar */}
            <div className="lg:col-span-1">
              {/* Price card */}
              <div className="sticky top-20 space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <p className="text-sm text-gray-400 mb-1">Listing Price</p>
                  <p className="text-3xl font-bold text-gray-900 mb-6">
                    {property.priceLabel}
                  </p>

                  <div className="space-y-3">
                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium text-sm py-3 rounded-lg transition-colors">
                      Schedule a Tour
                    </button>
                    <button className="w-full border border-gray-200 text-gray-700 font-medium text-sm py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Request Info
                    </button>
                  </div>
                </div>

                {/* Agent card */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Listing Agent
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                      E
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Elena Rodriguez
                      </p>
                      <p className="text-xs text-gray-400">
                        Head of Residential
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      (555) 123-4567
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      elena@estateelite.com
                    </div>
                  </div>
                </div>

                {/* Back link */}
                <Link
                  href="/properties"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors py-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to All Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
