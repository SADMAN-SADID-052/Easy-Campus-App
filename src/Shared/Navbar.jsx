import React, {  useState } from "react";
import { Link, NavLink } from "react-router";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center   ${isActive ? "text-white" : "text-[#0099FF]"}`
          }
          to="/"
        >
          <p className="text-sm font-bold ">Home</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center  ${isActive ? " text-white" : "text-[#0099FF]"}`
          }
          to="/apartment"
        >
          <p className="text-sm font-bold ">Events</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center  ${isActive ? " text-white" : "text-[#0099FF]"}`
          }
          to="/apartment"
        >
          <p className="text-sm font-bold ">Add Event</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center  ${isActive ? " text-white" : "text-[#0099FF]"}`
          }
          to="/apartment"
        >
          <p className="text-sm font-bold ">My Event</p>
        </NavLink>
      </li>
     
 
    </>
  );

  return (
    <div>
      <div className="navbar shadow-sm fixed z-50  bg-[#001F3F]">
        <div className="navbar-start">
          <div className="dropdown text-white text-3xl bg-amber-700 rounded-md">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black rounded-box z-10 mt-4 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center">
            <img
              className="w-12"
              src="https://img.icons8.com/?size=96&id=fTBV7GkKahC6&format=png"
              alt="Logo"
            />
            <p class="text-2xl font-extrabold bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent ml-2">
              EventNest
            </p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {/* {user ? (
            <div className="relative">
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-12 h-12 rounded-full cursor-pointer border-[#FFB200] border-3"
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 p-2">
                  <div className="px-4 py-2 text-sm text-gray-700 font-bold text-center">
                    {user.displayName}
                  </div>
                  <hr />
                  <Link
                    to="/dashboard"
                    className="btn btn-error w-full mt-2 hover:bg-black"
                  >
                    <div className="flex gap-1 items-center">
                      <img
                        className="w-5"
                        src="https://cdn-icons-png.freepik.com/256/16596/16596825.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                        alt=""
                      />
                      <p className="text-white ">Dashboard</p>
                    </div>
                  </Link>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-black font-bold btn btn-primary mt-2"
                  >
                    <div className="flex items-center gap-1">
                      <img
                        className="w-5"
                        src="https://cdn-icons-png.freepik.com/256/10977/10977462.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                        alt=""
                      />
                      <p>Logout</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : ( */}
            <Link to="/auth/login">
              <p className="text-[#0099FF] p-7 font-bold hover:text-white text-xl">Login</p>
            </Link>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
