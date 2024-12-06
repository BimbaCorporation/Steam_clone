import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
          <img width={700} src="/image/about/home.gif" alt="" />
          <nav>
            <Link to="/">
              <button>Назад</button>
            </Link>
          </nav>
        </div>
      );
};

export default NotFound;
