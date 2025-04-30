// pages/NameInputPage.js
import React from 'react';

const NameInputPage = () => {
  const handleComplete = () => {
    // Здесь можно добавить логику завершения регистрации
    alert('Регистрация завершена!');
  };

  return (
    <div className="auth-page">
      <h1>Введите ваше имя и фамилию</h1>
      <input type="text" placeholder="Имя" />
      <input type="text" placeholder="Фамилия" />
      <button onClick={handleComplete}>Завершить</button>
    </div>
  );
};

export default NameInputPage;