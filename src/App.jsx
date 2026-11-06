import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HappyPeriodBoxPage from './pages/HappyPeriodBoxPage';

export default function App() {
  const match = window.location.pathname.match(/^\/(lovedare)(?:\/|$)/i);
  const basename = match ? `/${match[1]}` : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/happy-period-box" element={<HappyPeriodBoxPage />} />
        <Route path="/happy-period-box.html" element={<HappyPeriodBoxPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
