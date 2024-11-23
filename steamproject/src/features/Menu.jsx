import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

const Menu = () => {
  return (
    <div className="menu">
      {/* Використовуємо обробник події на кліку по зображенню */}
      <img
        src="/image/logo.png"
        alt="Logo"
        className="menu-logo"
        onClick={() => window.location.href = '/'} // Перехід на Home при натисканні
        style={{ cursor: 'pointer' }} // Додаємо курсор для клікабельного елемента
      />

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