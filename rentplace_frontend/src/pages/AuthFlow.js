// AuthFlow.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Убираем BrowserRouter
import EmailInputPage from './EmailInputPage';
import CodeVerificationPage from './CodeVerificationPage';
import NameInputPage from './NameInputPage';

const AuthFlow = () => {
  return (
    <Routes>
      <Route path="email" element={<EmailInputPage />} />
      <Route path="code" element={<CodeVerificationPage />} />
      <Route path="name" element={<NameInputPage />} />
    </Routes>
  );
};

export default AuthFlow;