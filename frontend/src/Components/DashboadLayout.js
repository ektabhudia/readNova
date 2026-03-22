import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, User, LogOut } from "lucide-react";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth state or token here if needed
    navigate("/login");
  };

  return (
    <div
      className="flex min-h-screen font-sans"
      style={{ fontFamily: "Semantic UI, sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className={`bg-white text-gray-800 flex flex-col transition-all duration-300 border-r border-gray-200 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img
                src="/logo192.png"
                alt="Logo"
                className="w-8 h-8 rounded-full shadow"
              />
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                Read<span className="text-orange-500">Nova</span>
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-100 transition-all focus:outline-none"
            aria-label="Toggle sidebar"
            style={{
              boxShadow: "0 1px 4px 0 #ececec",
              marginLeft: collapsed ? 0 : "auto",
            }}
          >
            {collapsed ? (
              <Menu size={22} className="text-gray-700" />
            ) : (
              <X size={22} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-4 flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded transition-colors"
          >
            <Home size={20} />
            {!collapsed && <span className="text-lg">Home</span>}
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded transition-colors"
          >
            <User size={20} />
            {!collapsed && <span className="text-lg">Profile</span>}
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-lg">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <main className="flex-1 p-8 bg-white rounded-lg m-6 shadow-md">
          <Outlet /> {/* Child pages render here */}
        </main>

        <footer className="bg-gray-100 text-gray-600 text-center p-4 mt-4">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
