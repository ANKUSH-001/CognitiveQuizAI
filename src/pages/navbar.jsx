import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBrain, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa"; // Icons
import { FiMenu, FiX } from "react-icons/fi"; // Menu and Close icons
import { useAuth } from "../context/authContext"; // Import auth context

const Navbar = () => {
  const { user, handleLogout } = useAuth(); // Get user & logout function
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For user dropdown
  // bg-[#0B0C10]
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md relative">
      {/* Left - Logo & Name */}
      <div className="flex items-center gap-2">
        <FaBrain size={28} className="text-[#66FCF1]" />
        <h1 className="text-xl font-bold text-[#66FCF1]">Cognitive Quiz</h1>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {menuOpen ? (
          <FiX size={28} className="text-[#66FCF1]" onClick={() => setMenuOpen(false)} />
        ) : (
          <FiMenu size={28} className="text-[#66FCF1]" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Logged-Out State */}
      {!user && (
        <>
          {/* Center - Navigation Links (Hidden in Mobile) */}
          <ul className="hidden md:flex gap-6 text-lg">
            <li><Link to="/" className="hover:text-[#66FCF1] transition">Home</Link></li>
            <li><Link to="/pricing" className="hover:text-[#66FCF1] transition">Pricing</Link></li>
            <li><Link to="/about" className="hover:text-[#66FCF1] transition">About Us</Link></li>
            <li><Link to="/features" className="hover:text-[#66FCF1] transition">Features</Link></li>
          </ul>

          {/* Right - Login & Signup (Hidden in Mobile) */}
          <div className="hidden md:flex gap-4">
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 border border-[#66FCF1] rounded hover:bg-[#66FCF1] hover:text-black transition">
              <FaUser size={16} /> Login
            </Link>
            <Link to="/signup" className="flex items-center gap-2 px-4 py-2 bg-[#66FCF1] text-black rounded hover:bg-[#45A29E] transition">
              <FaUserPlus size={16} /> Signup
            </Link>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-16 left-0 w-full bg-[#0B0C10] text-white p-4 flex flex-col gap-4 md:hidden">
              <Link to="/" className="hover:text-[#66FCF1] transition" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/pricing" className="hover:text-[#66FCF1] transition" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link to="/about" className="hover:text-[#66FCF1] transition" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/features" className="hover:text-[#66FCF1] transition" onClick={() => setMenuOpen(false)}>Features</Link>

              {/* Login & Signup in the Same Row */}
              <div className="flex justify-center gap-4 mt-2">
                <Link to="/login" className="flex items-center gap-2 px-4 py-2 border border-[#66FCF1] rounded hover:bg-[#66FCF1] hover:text-black transition" onClick={() => setMenuOpen(false)}>
                  <FaUser size={16} /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-2 px-4 py-2 bg-[#66FCF1] text-black rounded hover:bg-[#45A29E] transition" onClick={() => setMenuOpen(false)}>
                  <FaUserPlus size={16} /> Signup
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* Logged-In State */}
      {user && (
        <>
          

          {/* Right - User Dropdown (Hidden in Mobile) */}
          <div className="hidden md:flex gap-4">
            <div className="relative z-50">
              {/* User Info Button */}
              <button
                className="flex items-center gap-2 px-4 py-2 bg-[#66FCF1] text-black rounded hover:bg-[#45A29E] transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser size={16} /> {user.name}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1F2833] text-white rounded-lg shadow-lg p-2">
                  <p className="text-center text-sm">{user.email}</p>
                  <button
                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                  >
                    
                    <FaSignOutAlt size={11} /> Logout
               
                    
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-16 left-110 mb-30 w-70 items-center bg-[white] rounded-lg shadow-lg text-black p-4 flex flex-col gap-4 ">
              <p className="text-center text-sm">{user.name}</p>
              <p className="text-center text-sm">{user.email}</p>

              {/* Logout Button */}
              <button
                className=" mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                <FaSignOutAlt size={11} /> Logout
              </button>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;