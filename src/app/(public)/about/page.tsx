import Image from "next/image";
import Link from "next/link";

const coreValues = [
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
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Integrity First",
    description:
      "We believe in radical honesty and transparency in every interaction, ensuring our clients feel secure throughout the process.",
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
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Expert Insight",
    description:
      "Our deep market knowledge and data-driven approach provide our clients with a competitive edge in any market condition.",
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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Client Focused",
    description:
      "Your goals are our goals. We provide personalized attention to every client, regardless of the property value.",
  },
];

const team = [
  {
    name: "Marcus Sterling",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=faces",
    bio: "With over 25 years of experience, Marcus leads the agency with a vision for modern, ethical real estate.",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Residential",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=faces",
    bio: "Elena specializes in luxury high-rise developments and has closed over $500M in residential sales.",
  },
  {
    name: "David Chen",
    role: "Investment Specialist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=faces",
    bio: "David provides our clients with advanced financial modeling and portfolio diversification strategies.",
  },
  {
    name: "Sarah Jenkins",
    role: "Relocation Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=faces",
    bio: "Sarah helps families transition seamlessly across states with her expert logistical and local knowledge.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[340px] lg:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=500&fit=crop"
              alt="Modern luxury home exterior"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 sm:p-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Our Story
              </h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Redefining the standard of luxury living since 1995.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Heritage */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — Text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
                Building Dreams Across
                <br className="hidden sm:block" />
                Generations
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Founded on the principles of integrity and transparency,
                  EstateBridge has grown from a small local boutique to a leading
                  real estate agency. We believe that finding a home is more than
                  a transaction; it&apos;s a milestone.
                </p>
                <p>
                  For nearly three decades, we have connected families with their
                  dream spaces, developers with their visions, and investors with
                  opportunities. Our commitment remains unchanged: to provide
                  unparalleled service through expertise and heart.
                </p>
              </div>
            </div>

            {/* Right — Image grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top-left image */}
              <div className="relative rounded-xl overflow-hidden h-48 sm:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=350&fit=crop"
                  alt="Modern home interior"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Top-right stat card */}
              <div className="bg-primary rounded-xl flex flex-col items-center justify-center h-48 sm:h-56 text-white">
                <span className="text-4xl sm:text-5xl font-bold">12k+</span>
                <span className="text-sm text-blue-100 mt-1">
                  Properties Sold
                </span>
              </div>

              {/* Bottom-left stat card */}
              <div className="bg-primary rounded-xl flex flex-col items-center justify-center h-48 sm:h-56 text-white">
                <span className="text-4xl sm:text-5xl font-bold">28+</span>
                <span className="text-sm text-blue-100 mt-1">
                  Years Experience
                </span>
              </div>

              {/* Bottom-right image */}
              <div className="relative rounded-xl overflow-hidden h-48 sm:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=350&fit=crop"
                  alt="Luxury property interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              The principles that guide every handshake and every key turnover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 text-primary">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Experts */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our People
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Meet Our Experts
              </h2>
            </div>
            <p className="text-gray-500 max-w-md lg:text-right">
              Our team of dedicated professionals brings years of industry
              experience to help you find your perfect home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group">
                {/* Photo */}
                <div className="relative rounded-xl overflow-hidden h-72 sm:h-64 lg:h-72 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-primary mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {member.bio}
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
              Ready to find your new home?
            </h2>
            <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
              Let our team of experts guide you through every step of your real
              estate journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-primary font-medium text-sm px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/properties"
                className="bg-blue-700 text-white font-medium text-sm px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
