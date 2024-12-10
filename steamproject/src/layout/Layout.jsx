import React from 'react'
import Menu from '../pages/Menu/Menu'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div>
        <Menu />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
