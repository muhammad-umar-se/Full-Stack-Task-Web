import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='dashboard' replace />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
