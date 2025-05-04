import React from "react";
import "./ProfilePage.css";
import Header from "../components/Header";
import { ChevronRight } from "lucide-react";
import { Trophy } from "lucide-react";
import { Settings } from "lucide-react";
import { Info } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { LogOut } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";

const ProfilePage = () => {
  return (
    <>
      <div className="profile">
        <Header></Header>
        <div className="profile-container">
          {/* Профиль пользователя */}
          <div className="profile-section">
            <div className="profile-info">
              <img src="./images/profile.png" alt="Profile" />
              <div className="user-details">
                <h2>Борис Назаров</h2>
                <p>Adonis27@gmail.com</p>
              </div>
            </div>
            <ChevronRight></ChevronRight>
          </div>

          {/* Другие разделы */}
          <div className="additional-sections">
            <div className="section-item">
              <Trophy></Trophy>
              <span>Достижения</span>
            </div>
            <div className="section-item">
              <Settings></Settings>
              <span>Настройки приложения</span>
            </div>
            <div className="section-item">
              <Info></Info>
              <span>О нас</span>
            </div>
            <div className="section-item">
              <CircleHelp></CircleHelp>
              <span>Помощь</span>
            </div>
          </div>

          {/* Выход из аккаунта */}
          <div className="logout-section">
            <LogOut></LogOut>
            <span>Выйти из аккаунта</span>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default ProfilePage;
