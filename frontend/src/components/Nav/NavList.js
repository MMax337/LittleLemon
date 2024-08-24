import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavList = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains a hash (e.g., #about)
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#menu">Menu</a></li>
      <li><Link to="/booking">Reservartions</Link></li>
      <li><Link to="/order">Order Online</Link></li>
      <li><Link to="/login">Login</Link></li>
  </ul>
  );
}


export default NavList;