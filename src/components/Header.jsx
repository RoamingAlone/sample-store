import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">
          <span>Phone &amp; Computer Store</span>
        </div>

        <nav className="site-header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
