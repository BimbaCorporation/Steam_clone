import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Імпорт компонентів
import Menu from '../pages/Menu/Menu';
import Home from '../pages/Home/Home';
import Browse from '../pages/Browse/Browse';
import Search from '../pages/Search/Search';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';


const BasicRoute = () => {
    return (
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  };
  

export default BasicRoute;
