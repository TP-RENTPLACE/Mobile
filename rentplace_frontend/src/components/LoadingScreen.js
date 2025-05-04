// components/LoadingScreen.js
import React from 'react';
import './LoadingScreen.css'; // Стили для загрузочного экрана
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Logo/>
    </div>
  );
};

export default LoadingScreen;