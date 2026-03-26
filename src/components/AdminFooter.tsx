export default function AdminFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} EstateElite Realty. Admin Panel.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/admin/properties"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Properties
            </a>
            <span className="text-gray-200">|</span>
            <a
              href="/"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              View Site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
