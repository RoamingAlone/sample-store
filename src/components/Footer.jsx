import React from "react";

function Footer() {
  return (
    <footer className="site-footer">
      <p>Contact Us: <a href= "mailto:info@scamshop.com">info@scamshop.com</a> | <a href="https://www.w3schools.com/about/about_copyright.asp">Terms & Conditions</a></p>
      <p>&copy; {new Date().getFullYear()} Phone &amp; Computer Store</p>
    </footer>
  );
}

export default Footer;
