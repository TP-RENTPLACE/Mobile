// AuthFlow.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Убираем BrowserRouter
import EmailInputPage from './EmailInputPage';
import CodeVerificationPage from './CodeVerificationPage';
import NameInputPage from './NameInputPage';

const AuthFlow = () => {
  return (
    <Routes>
      {/* Шаг 1: Ввод email */}
      <Route path="email" element={<EmailInputPage />} />
      {/* Шаг 2: Подтверждение кода */}
      <Route path="code" element={<CodeVerificationPage />} />
      {/* Шаг 3: Ввод имени и фамилии */}
      <Route path="name" element={<NameInputPage />} />
    </Routes>
  );
};

export default AuthFlow;