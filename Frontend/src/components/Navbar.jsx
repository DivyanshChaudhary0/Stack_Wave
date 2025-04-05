import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({setDarkMode,darkMode}) => {

  const {user} = useSelector((state) => state.user)

  return (
    <nav className={ darkMode ? "w-full bg-black text-white shadow-sm flex items-center gap-2 border-b-[1px] py-2" : "bg-white text-black py-2"}>
      <div className="w-[90%] lg:w-[85%] mx-auto navbar flex items-center justify-between">
        <div className="basis-xl">
          <p className="text-xl">
            Stack <strong>Wave</strong>
          </p>
        </div>
        <div className="flex flex-row-reverse md:flex-row items-center md:gap-4">
          <input
            type="text"
            placeholder="Search"
            className={`hidden bg-transparent md:block input input-bordered w-28 md:w-96 ${darkMode && "border border-white"} `}
          />

          {user ? <div className={`dropdown dropdown-end ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} `}>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className={`menu menu-sm dropdown-content ${darkMode ? "bg-black" : "bg-base-100"} rounded-box z-1 mt-3 w-52 p-2 shadow`}>
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> : <div className="px-6 py-2 border-1 border-dotted rounded font-semibold cursor-pointer">Login</div> }

          <div className="themeController mx-6">
          <label className="toggle text-base-content">
              <input type="checkbox" value="synthwave" className="theme-controller" onChange={(e) => setDarkMode(!darkMode)} />

              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

          </label>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
