import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { X, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer "
          onClick={() => navigate('/')}
        />

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          {sidebar ? (
            <X
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => setSidebar(true)}
            />
          )}
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="flex flex-row flex-1 h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 bg-[#F4F7FB] p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
