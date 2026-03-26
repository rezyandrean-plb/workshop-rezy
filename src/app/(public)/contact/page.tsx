"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "Buying a Property",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Message sent! We'll get back to you shortly.");
    setFormData({
      fullName: "",
      email: "",
      subject: "Buying a Property",
      message: "",
    });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h1>
          <p className="text-gray-500 max-w-xl leading-relaxed">
            Whether you&apos;re looking to buy, sell, or just have a question
            about the market, our expert team is here to guide you every step of
            the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left — Contact Form */}
            <div className="border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
                  >
                    <option>Buying a Property</option>
                    <option>Selling a Property</option>
                    <option>Renting</option>
                    <option>Investment Inquiry</option>
                    <option>General Question</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium text-sm py-3.5 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right — Info, Map, Social */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Main Office */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Main Office
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    123 Luxury Lane, Suite 500
                    <br />
                    Beverly Hills, CA 90210
                  </p>
                </div>

                {/* Call Us */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Office: (555) 123-4567
                    <br />
                    Support: (555) 987-6543
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative rounded-xl overflow-hidden h-64 sm:h-72 bg-blue-50 border border-gray-200">
                {/* Stylized map background */}
                <div className="absolute inset-0">
                  <svg
                    className="w-full h-full text-blue-100"
                    viewBox="0 0 800 400"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {/* Roads */}
                    <line
                      x1="0"
                      y1="200"
                      x2="800"
                      y2="200"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <line
                      x1="400"
                      y1="0"
                      x2="400"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <line
                      x1="0"
                      y1="100"
                      x2="800"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="0"
                      y1="300"
                      x2="800"
                      y2="300"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="200"
                      y1="0"
                      x2="200"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="600"
                      y1="0"
                      x2="600"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="100"
                      y1="0"
                      x2="100"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="300"
                      y1="0"
                      x2="300"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="500"
                      y1="0"
                      x2="500"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="700"
                      y1="0"
                      x2="700"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="0"
                      y1="50"
                      x2="800"
                      y2="50"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="0"
                      y1="150"
                      x2="800"
                      y2="150"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="0"
                      y1="250"
                      x2="800"
                      y2="250"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="0"
                      y1="350"
                      x2="800"
                      y2="350"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                    {/* Green areas */}
                    <rect
                      x="420"
                      y="110"
                      width="60"
                      height="40"
                      rx="4"
                      fill="#d1fae5"
                      opacity="0.6"
                    />
                    <rect
                      x="150"
                      y="220"
                      width="80"
                      height="50"
                      rx="4"
                      fill="#d1fae5"
                      opacity="0.6"
                    />
                    <rect
                      x="550"
                      y="280"
                      width="70"
                      height="45"
                      rx="4"
                      fill="#d1fae5"
                      opacity="0.6"
                    />
                  </svg>
                </div>

                {/* Map pin tooltip */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Elite Realty HQ
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        123 Luxury Lane, CA
                      </p>
                    </div>
                  </div>
                  {/* Pin arrow */}
                  <div className="flex justify-center mt-1">
                    <div className="w-3 h-3 bg-white rotate-45 shadow-lg -mt-2" />
                  </div>
                </div>
              </div>

              {/* Connect With Us */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Connect With Us
                </h3>
                <div className="flex items-center gap-3">
                  {/* Globe / Website */}
                  <a
                    href="#"
                    className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
                    aria-label="Website"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </a>

                  {/* Share */}
                  <a
                    href="#"
                    className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
                    aria-label="Share"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
                    </svg>
                  </a>

                  {/* Chat */}
                  <a
                    href="#"
                    className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
                    aria-label="Chat"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@estateelite.com"
                    className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
                    aria-label="Email"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
