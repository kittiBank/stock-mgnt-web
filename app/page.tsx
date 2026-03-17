export default function Home() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-950">Dashboard</h1>
        <p className="text-blue-600 mt-2">Welcome to Stock Management System</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Card Placeholder */}
        <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-blue-900">Overview</h3>
          <p className="text-blue-600 text-sm mt-2">
            Page content coming soon...
          </p>
        </div>

        {/* Stock Summary Card Placeholder */}
        <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-blue-900">Stock Summary</h3>
          <p className="text-blue-600 text-sm mt-2">
            Page content coming soon...
          </p>
        </div>

        {/* Low Stock Alert Card Placeholder */}
        <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-blue-900">Low Stock Alert</h3>
          <p className="text-blue-600 text-sm mt-2">
            Page content coming soon...
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 mt-8">
        <h2 className="font-semibold text-blue-950">Navigation Guide</h2>
        <ul className="mt-4 space-y-2 text-sm text-blue-900">
          <li>• Use the left sidebar to navigate between different modules</li>
          <li>• Click on menu items to expand/collapse submenu</li>
          <li>
            • Use the top bar to access notifications, theme, and user menu
          </li>
          <li>• Each page will be populated with content in the next phase</li>
        </ul>
      </div>
    </div>
  );
}
