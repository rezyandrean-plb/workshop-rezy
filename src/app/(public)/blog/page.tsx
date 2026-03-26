"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categoryColor: string;
  image: string;
  tab: string;
};

const featuredArticle = {
  title: "Quarterly Market Report: Why Now Is the Time to Invest",
  excerpt:
    "Our analysts break down the latest shifts in inventory and mortgage rates, revealing strategic advantages for buyers and investors this season.",
  date: "May 24, 2024",
  readTime: "8 min read",
  image:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
};

const allArticles: Article[] = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Home Buyers",
    excerpt:
      "Navigating your first real estate purchase doesn't have to be overwhelming. From pre-approval to closing day.",
    date: "MAY 21, 2024",
    category: "BUYING TIPS",
    categoryColor: "bg-blue-100 text-blue-700",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=350&fit=crop",
    tab: "Home Buying",
  },
  {
    id: 2,
    title: "Understanding Mortgage Rates in 2024",
    excerpt:
      "Expert analysis on the Federal Reserve's recent decisions and how they affect your monthly mortgage payments.",
    date: "MAY 18, 2024",
    category: "ECONOMY",
    categoryColor: "bg-green-100 text-green-700",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=350&fit=crop",
    tab: "Market Updates",
  },
  {
    id: 3,
    title: "The Rise of Sustainable Living and Green Architecture",
    excerpt:
      "Energy-efficient homes are no longer a luxury. Discover the green features that increase property value.",
    date: "MAY 15, 2024",
    category: "SUSTAINABILITY",
    categoryColor: "bg-teal-100 text-teal-700",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop",
    tab: "Home Buying",
  },
  {
    id: 4,
    title: "Top 5 Emerging Neighborhoods for Investors",
    excerpt:
      "Where should you put your capital this year? We look at infrastructure growth and rental demand.",
    date: "MAY 12, 2024",
    category: "LOCAL NEWS",
    categoryColor: "bg-orange-100 text-orange-700",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=350&fit=crop",
    tab: "Local Spotlight",
  },
  {
    id: 5,
    title: "Simple Staging Tricks to Sell Your Home Faster",
    excerpt:
      "First impressions are everything. Learn how to declutter and light your space for maximum appeal.",
    date: "MAY 09, 2024",
    category: "HOME DESIGN",
    categoryColor: "bg-purple-100 text-purple-700",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=350&fit=crop",
    tab: "Interior Design",
  },
  {
    id: 6,
    title: "Buying a Condo vs. Detached Home: Pros and Cons",
    excerpt:
      "Which lifestyle suits your needs? A comprehensive comparison of maintenance, fees, and appreciation.",
    date: "MAY 05, 2024",
    category: "CONDO LIVING",
    categoryColor: "bg-red-100 text-red-700",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=350&fit=crop",
    tab: "Home Buying",
  },
  {
    id: 7,
    title: "How Remote Work Is Reshaping Housing Demand",
    excerpt:
      "The shift to hybrid offices is driving migration patterns. See which cities are winning the race.",
    date: "MAY 02, 2024",
    category: "ECONOMY",
    categoryColor: "bg-green-100 text-green-700",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=350&fit=crop",
    tab: "Market Updates",
  },
  {
    id: 8,
    title: "Renovation ROI: Which Upgrades Pay for Themselves",
    excerpt:
      "Kitchen remodels, bathroom refreshes, and curb appeal projects — ranked by return on investment.",
    date: "APR 28, 2024",
    category: "HOME DESIGN",
    categoryColor: "bg-purple-100 text-purple-700",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=500&h=350&fit=crop",
    tab: "Interior Design",
  },
  {
    id: 9,
    title: "The Complete Guide to Real Estate Investment Trusts",
    excerpt:
      "REITs offer a hands-off way to build property wealth. Here's everything you need to know to start.",
    date: "APR 24, 2024",
    category: "BUYING TIPS",
    categoryColor: "bg-blue-100 text-blue-700",
    image:
      "https://images.unsplash.com/photo-1582407947092-67e4c43b9e8f?w=500&h=350&fit=crop",
    tab: "Market Updates",
  },
  {
    id: 10,
    title: "Walkability Scores: Why They Matter More Than Ever",
    excerpt:
      "Buyers are prioritizing walkable neighborhoods. We explore the data behind the shift.",
    date: "APR 20, 2024",
    category: "LOCAL NEWS",
    categoryColor: "bg-orange-100 text-orange-700",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=350&fit=crop",
    tab: "Local Spotlight",
  },
  {
    id: 11,
    title: "Smart Home Tech That Adds Real Value",
    excerpt:
      "From automated blinds to energy monitors — the devices that buyers actually want to see.",
    date: "APR 16, 2024",
    category: "HOME DESIGN",
    categoryColor: "bg-purple-100 text-purple-700",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=500&h=350&fit=crop",
    tab: "Interior Design",
  },
  {
    id: 12,
    title: "Interest Rate Forecast: What to Expect in H2 2024",
    excerpt:
      "Three economic scenarios and what each means for your buying or refinancing timeline.",
    date: "APR 12, 2024",
    category: "ECONOMY",
    categoryColor: "bg-green-100 text-green-700",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=350&fit=crop",
    tab: "Market Updates",
  },
];

const tabs = [
  "All Insights",
  "Market Updates",
  "Home Buying",
  "Interior Design",
  "Local Spotlight",
];

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("All Insights");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredArticles = useMemo(() => {
    let results =
      activeTab === "All Insights"
        ? [...allArticles]
        : allArticles.filter((a) => a.tab === activeTab);

    if (sortBy === "oldest") {
      results.reverse();
    }

    return results;
  }, [activeTab, sortBy]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setVisibleCount(INITIAL_COUNT);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Article Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 sm:h-80 lg:h-[420px]">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-blue-50 px-3 py-1 rounded-md w-fit mb-4">
                  Featured Insight
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  {featuredArticle.title}
                </h1>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
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
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {featuredArticle.readTime}
                  </span>
                </div>
                <Link
                  href="#"
                  className="inline-block bg-primary hover:bg-primary-dark text-white font-medium text-sm px-6 py-3 rounded-full transition-colors w-fit"
                >
                  Read Full Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Sort */}
      <section className="px-4 sm:px-6 lg:px-8 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200">
            {/* Tabs */}
            <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0 pb-3 sm:pb-0">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-semibold text-gray-900 bg-transparent outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {visibleArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No articles in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visibleArticles.map((article) => (
                <article
                  key={article.id}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative rounded-xl overflow-hidden h-52 sm:h-48 lg:h-52 mb-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${article.categoryColor}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 font-medium mb-2">
                    {article.date}
                  </p>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() =>
                  setVisibleCount((prev) => prev + LOAD_MORE_COUNT)
                }
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Load More Articles
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-2xl px-6 sm:px-12 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left text */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Never miss a market update
                </h2>
                <p className="text-blue-100 leading-relaxed">
                  Join 15,000+ homeowners and investors who receive our weekly
                  newsletter with exclusive market data and buying tips.
                </p>
              </div>

              {/* Right form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="bg-white text-primary font-medium text-sm px-8 py-3 rounded-full hover:bg-blue-50 transition-colors shrink-0">
                  Sign Me Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
