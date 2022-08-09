import "./Header.Module.css";

import cartImg from "../../images/cart.png";

export const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-row">
        <a href="/">
          <span className="navbar-title">My PC Parts</span>
        </a>
        <div className="cart">
          <img className="cart-img" src={cartImg} alt="cart-img" />
        </div>
        <div className="login-register">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </nav>
  );
};
