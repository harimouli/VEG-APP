import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.name || parsedUser.email); 
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-green-600">
          🥦 VegBazzer
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>

          {user ? (
            <>
              <span className="text-gray-700 flex items-center gap-2 font-medium">
                <FaUserCircle className="text-lg" /> {user}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
            >
              <FaSignInAlt /> Sign In
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 flex flex-col gap-3">
          <Link to="/" onClick={toggleMenu} className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          {user ? (
            <>
              <span className="text-gray-700 flex items-center gap-2">
                <FaUserCircle /> {user}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              onClick={toggleMenu}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
            >
              <FaSignInAlt /> Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
