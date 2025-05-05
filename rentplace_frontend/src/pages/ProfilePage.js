import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Header from "../components/Header";
import { ChevronRight, Trophy, Settings, Info, CircleHelp, LogOut } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import authService from "../api/authService";
import BigBlueButton from "../components/BigBlueButton"

const ProfilePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const [userInfo, setUserInfo] = useState(null);

  const handleAuthRedirect = () => {
    navigate('/auth/email');
  };

  const handleLogout = () => {
    apiClient.clearAuth();
    localStorage.removeItem('authEmail');
    navigate("/profile");
  };

  useEffect(() => {
    if (isAuthenticated) {
      authService.getInfo()
          .then(setUserInfo)
          .catch(() => {
            apiClient.clearAuth();
            navigate("/auth/email");
          });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
        <>
          <div className="profile">
            <Header />
            <div className="unauthorized-container">
              <p className="login-prompt">
                Войдите, чтобы получить доступ ко всем функциям приложения
              </p>
              <BigBlueButton props="Войти / Зарегистрироваться" fullwidth="fullwidth"  onClick={handleAuthRedirect}/>
              {/* <button className="auth-button" onClick={handleAuthRedirect}> */}
                {/* Войти / Зарегистрироваться
              </button> */}
              <div className="additional-sections">
                <div className="section-item">
                  <Info />
                  <span>О нас</span>
                </div>
                <div className="section-item">
                  <CircleHelp />
                  <span>Помощь</span>
                </div>
              </div>
            </div>
          </div>
          <BottomNavigation />
        </>
    );
  }

  if (!userInfo) {
    return <div className="profile-loading">Загрузка профиля...</div>;
  }

  return (
      <>
        <div className="profile">
          <Header />
          <div className="profile-container">
            <div className="profile-section">
              <div className="profile-info">
                <img src={userInfo.imageDTO?.url} alt="Profile" />
                <div className="user-details">
                  <h2>{userInfo.name} {userInfo.surname}</h2>
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <ChevronRight />
            </div>

            <div className="additional-sections">
              
              <div className="section-item">
                <Settings />
                <span>Настройки приложения</span>
              </div>
              <div className="section-item">
                <Info />
                <span>О нас</span>
              </div>
              <div className="section-item">
                <CircleHelp />
                <span>Помощь</span>
              </div>
            </div>

            <div className="logout-section" onClick={handleLogout}>
              <LogOut />
              <span>Выйти из аккаунта</span>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </>
  );
};

export default ProfilePage;