import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/destination");
  };
  
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="header">
      {/* left:logo */}
      <img className="logo" src="/images/Playstation_icon.png" alt="Logo" />

      {/* middle:Links */}
      <nav className="nav-links">
        {isAdmin ? (
          // 如果是在admin页面，显示admin相关链接
          <>
            <Link to="/admin/login">Login</Link>
            <Link to="/admin/register">Register</Link>
            <Link to="/admin/game-inquiry">Game Inquiry</Link>
            <Link to="/admin/game-add">Game Add</Link>
            <Link to="/">client -&gt;</Link>
          </>
        ) : (
          // 否则显示默认的客户页面导航
          <>
            <Link to="/">Home</Link>
            <Link to="/games">Games</Link>
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/admin">admin -&gt;</Link>
          </>
        )}
      </nav>

      {/* right:search */}
      <div className="icon" onClick={handleIconClick}>
        <img src="/images/Search_icon.png" alt="Search" />
      </div>
    </header>
  );
};

export default Header;
