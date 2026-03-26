import Image from "next/image";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Modern Oasis Villa",
    location: "Beverly Hills, CA",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    tag: "FOR SALE",
    tagColor: "bg-red-500",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Sunset Valley Estate",
    location: "Austin, TX",
    price: "$850,000",
    beds: 3,
    baths: 2,
    sqft: "2,450",
    tag: "FOR SALE",
    tagColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Skyline View Penthouse",
    location: "Miami, FL",
    price: "$4,200/mo",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    tag: "RENT",
    tagColor: "bg-green-500",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
  },
];

const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
    title: "Verified Listings",
    description:
      "Every property on our platform undergoes a rigorous verification process to ensure accuracy and peace of mind.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Expert Guidance",
    description:
      "Our seasoned agents bring decades of local market knowledge to help you make informed decisions every step of the way.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 5 4-9" />
      </svg>
    ),
    title: "Market Analytics",
    description:
      "Get real-time updates and deep insights into property trends to ensure you're getting the best value for your investment.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[480px] flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=600&fit=crop"
              alt="Luxury home exterior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-center px-6 py-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Find Your Dream Home
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Discover the perfect property in your favorite location with our
                expert guidance and verified listings.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-full p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mx-auto shadow-xl">
                <div className="flex items-center gap-2 flex-1 px-4 py-2">
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter city or ZIP code"
                    className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
                <div className="flex items-center gap-2 px-4 py-2">
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <select className="text-sm text-gray-700 outline-none bg-transparent appearance-none pr-6 cursor-pointer">
                    <option>Property Type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Villa</option>
                  </select>
                  <svg
                    className="w-4 h-4 text-gray-400 -ml-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white font-medium text-sm px-8 py-3 rounded-full transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Featured Properties
              </h2>
              <p className="text-gray-500 mt-1">
                Handpicked listings from our top agents.
              </p>
            </div>
            <Link
              href="/properties"
              className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:underline"
            >
              View All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Property image */}
                <div className="relative h-56">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-4 left-4 ${property.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-md z-10`}
                  >
                    {property.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-md z-10">
                    {property.price}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-gray-400 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.location}
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                      </svg>
                      {property.beds} Beds
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 12h16a1 1 0 0 1 1 1v3H3v-3a1 1 0 0 1 1-1zM3 16v2M21 16v2M6 12V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v7" />
                      </svg>
                      {property.baths} Baths
                    </div>
                    <div className="flex items-center gap-1.5">
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
                      {property.sqft} sqft
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/properties"
            className="sm:hidden flex items-center justify-center gap-1 text-primary font-medium text-sm mt-6 hover:underline"
          >
            View All
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why Choose EstateElite */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Why Choose EstateElite
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto leading-relaxed">
              We redefine the real estate experience through innovation,
              transparency, and personalized service tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl border border-gray-100 p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-2xl px-6 sm:px-12 py-14 lg:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to find your next
              <br />
              home?
            </h2>
            <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
              Join thousands of happy homeowners who found their perfect space
              with EstateModern. Start your search today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/properties"
                className="bg-white text-primary font-medium text-sm px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="bg-blue-700 text-white font-medium text-sm px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
              >
                Contact Agent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
