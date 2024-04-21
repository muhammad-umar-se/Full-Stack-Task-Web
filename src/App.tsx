import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './routes/private-route';
import PublicRoute from './routes/public-route';
import '../src/style/style.css';

const App: React.FC = () => {
  const { token } = useSelector((state: any) => state.auth);

  return (
    <Router>
      <Routes>
        {token ? (
          <Route path='/*' element={<PrivateRoute />} />
        ) : (
          <Route path='/*' element={<PublicRoute />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
