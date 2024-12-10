import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'

// Імпорт компонентів
import Layout from '../layout/Layout'
import About from '../pages/About/About'
import Browse from '../pages/Browse/Browse'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import Search from '../pages/Search/Search'

const BasicRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default BasicRoute
