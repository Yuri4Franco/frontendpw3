// src/components/Layout.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Layoutbar.css'; // Estilize conforme necessário

const Layout = ({ children }) => {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <div className={`layout ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
      <Sidebar onToggleSidebar={() => setSidebarHidden(!sidebarHidden)} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
