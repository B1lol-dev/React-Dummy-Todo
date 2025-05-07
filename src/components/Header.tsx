import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, LogIn, LogOut, Menu, User, X, CheckSquare } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold"
            onClick={closeMenu}
          >
            <CheckSquare className="h-6 w-6" />
            <span>TodoMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center gap-2 hover:text-indigo-200 transition-colors ${
                isActive("/") ? "text-white font-medium" : "text-indigo-100"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            {isAuthenticated() ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-2 hover:text-indigo-200 transition-colors ${
                      location.pathname.startsWith("/admin")
                        ? "text-white font-medium"
                        : "text-indigo-100"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-indigo-100 hover:text-indigo-200 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>

                <div className="flex items-center gap-2 pl-4 border-l border-indigo-400">
                  <div className="h-8 w-8 rounded-full bg-indigo-800 flex items-center justify-center text-xs font-bold uppercase">
                    {user?.firstName?.[0] || user?.username?.[0] || "U"}
                  </div>
                  <span className="text-sm">
                    {user?.firstName || user?.username}
                  </span>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-2 hover:text-indigo-200 transition-colors ${
                  isActive("/login")
                    ? "text-white font-medium"
                    : "text-indigo-100"
                }`}
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link
              to="/"
              className={`block py-2 px-4 rounded-lg ${
                isActive("/")
                  ? "bg-indigo-800 font-medium"
                  : "hover:bg-indigo-600"
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </div>
            </Link>

            {isAuthenticated() ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className={`block py-2 px-4 rounded-lg ${
                      location.pathname.startsWith("/admin")
                        ? "bg-indigo-800 font-medium"
                        : "hover:bg-indigo-600"
                    }`}
                    onClick={closeMenu}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>Admin</span>
                    </div>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 rounded-lg hover:bg-indigo-600"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </div>
                </button>

                <div className="flex items-center gap-3 py-2 px-4 border-t border-indigo-500 mt-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-800 flex items-center justify-center text-xs font-bold uppercase">
                    {user?.firstName?.[0] || user?.username?.[0] || "U"}
                  </div>
                  <span>{user?.firstName || user?.username}</span>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className={`block py-2 px-4 rounded-lg ${
                  isActive("/login")
                    ? "bg-indigo-800 font-medium"
                    : "hover:bg-indigo-600"
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-3">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
