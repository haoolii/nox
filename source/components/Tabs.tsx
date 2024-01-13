import { Tab, Tabs as MuiTabs } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Tabs: React.FC<{ paths: { title: string; path: string }[] }> = ({ paths }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <MuiTabs value={pathname.endsWith('/') ? pathname.slice(0, pathname.length - 1) : pathname}>
      {paths.map(path => (
        <Tab
          key={path.path}
          label={path.title}
          onClick={() => navigate(path.path)}
          value={path.path}
        />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
