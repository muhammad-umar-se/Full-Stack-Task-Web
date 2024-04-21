import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignIn from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='*' element={<Navigate to='/sign-in' replace />} />
    </Routes>
  );
};

export default PublicRoutes;
