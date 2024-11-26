import React, { ReactNode } from 'react';
import Navbar from './navbar';
import TopNavigation from './topNavigation';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="nav-md">
        <div className="container body">
            <div className="main_container">
                <Navbar></Navbar>
                <TopNavigation></TopNavigation>
                <div className="right_col h-auto" role="main">
                    {children}
                </div>
                <Footer></Footer>
            </div>
        </div>
    </div>
  )
}

export default Layout
