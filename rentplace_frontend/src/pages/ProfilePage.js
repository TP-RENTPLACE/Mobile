import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Header from "../components/Header";
import { ChevronRight, Settings, Info, CircleHelp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import authService from "../api/authService";
import BigBlueButton from "../components/BigBlueButton";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import defaultImage from "../assets/Avatar.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthRedirect = () => {
    navigate('/auth/email');
  };

  const handleProfileEditRedirect = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    apiClient.clearAuth();
    localStorage.removeItem('authEmail');
    navigate("/auth/email");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token || token === 'null') {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const authData = await authService.getInfo();
        setUserInfo(authData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        apiClient.clearAuth();
        setIsAuthenticated(false);
        navigate("/auth/email");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading)
    return (
        <div className="booking">
          <div className="properties-list">
            <div className="cards_container empty">
              <Skeleton height={150} borderRadius={8} />
              <Skeleton count={2} height={20} />
            </div>
          </div>
        </div>
    );

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
        </>
    );
  }

  return (
      <>
        <div className="profile">
          <Header />
          <div className="profile-container">
            <div className="profile-section" onClick={handleProfileEditRedirect}>
              <div className="profile-info">
                <img src={userInfo.imageDTO?.url || defaultImage} alt="Profile" />
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
              <LogOut color="#ff7878"/>
              <span>Выйти из аккаунта</span>
            </div>
          </div>
        </div>
      </>
  );
};

export default ProfilePage;