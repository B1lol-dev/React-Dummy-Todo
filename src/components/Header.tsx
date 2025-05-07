import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LogIn, Menu, X, CheckSquare } from "lucide-react";
import Container from "./helpers/Container";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold"
            onClick={closeMenu}
          >
            <CheckSquare className="h-6 w-6" />
            <span>Todo</span>
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
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
