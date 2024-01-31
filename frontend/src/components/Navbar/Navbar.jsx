import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, NavLink } from "react-router-dom";
import "../../Styles/Navbar.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/news",
    display: "News",
  },
  {
    path: "/vehicle",
    display: "Reviews",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

export default function Navbar() {
  const menuRef = useRef(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

 useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role")
      // localStorage.removeItem("role");
      localStorage.removeItem("username");
      message.warning("Logged Out");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='navbody'>
      <div className={`navbar ${isDrawerOpen ? 'active' : ''}`}>
        <div className="drawer">
            <input
              id="my-drawer"
              type="checkbox"
              role='navdrawer'
              className="drawer-toggle"
              checked={isDrawerOpen}
              onChange={toggleDrawer}
          />
          <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn bg-black btn-primary drawer-button burger-btn">
            <RxHamburgerMenu className='burger'/>
          </label>
          </div> 
          <div className={`drawer-side ${isDrawerOpen ? 'active' : ''}`}>
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="drawermenu p-40 w-80 h-full bg-black text-white">
                  <li className="welcome-text">Welcome {username}</li>
                  <li className="menu-item"><Link to="home">Home</Link></li>
                  <li className="menu-item"><Link to="profile">Profile</Link></li>
                  {role === "admin" && <li className="menu-item"><Link to="admin">Admin Page</Link></li>}
                  <li className="menu-item"><Link to="signin">Sign In</Link></li>
                  <li className="menu-item"><Link to="signup">Create An Account</Link></li>
                  <li className="menu-item"><Link to="about">About Us</Link></li>
                  <li className="menu-item"><Link to="contact">Contact</Link></li>
                  <li className="menu-item" onClick={logOut}><a>Logout</a></li>
              </ul>
          </div>           
        </div>

        <div className="navbar-center">
          <img src="/logo/logo.png" alt="Logo" />
        </div>

        <div className="navbar-end">
                <button className="btn btn-square btn-ghost">
                  <label className="swap swap-rotate w-12 h-12">
                    <input
                      type="checkbox"
                      role='themechange'
                      onChange={handleToggle}
                      // show toggle image based on localstorage theme
                      checked={theme === "light" ? false : true}
                    />
                    {/* light theme sun image */}
                    <MdOutlineLightMode size={30} color="white" alt="light" className="w-8 h-8 swap-on" />
                    {/* dark theme moon image */}
                    <MdOutlineDarkMode size={30} color="white" alt="dark" className="w-8 h-8 swap-off" />
                  </label>
                </button>
              </div>
        </div>

        <div className="main__navbar bg-black">
          <div className="container mx-auto">
            <div className="navigation__wrapper flex items-center">
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <div className="menu">
                  {navLinks.map((item, index) => (
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'nav__active nav__item' : 'nav__item'
                      }
                      key={index}
                    >
                      {item.display}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
