import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

const Menu = () => {
  return (
    <div className="menu">
      {/* Встановлюємо зображення як логотип */}
      <img src="/image/logo.png"  className="menu-logo" />
      <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/browse"><button>Browse</button></Link>
        <Link to="/search"><button>Search</button></Link>
        <Link to="/about"><button>About</button></Link>
      </nav>
    </div>
  );
};

export default Menu;