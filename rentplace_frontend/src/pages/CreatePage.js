import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./CreatePage.css";
import BigBlueButton from "../components/BigBlueButton";
import MyPropertyList from "../components/MyPropertyList";
import { sendMetrik } from "../utils/metrics";

const CreatePage = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("PUBLISHED");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const isValidToken = Boolean(token && token !== "null" && token !== "undefined");
      setIsLoggedIn(isValidToken);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleAuthRedirect = () => {
    navigate('/auth/email');
  };

  const handleButtonClick = () => {
    navigate("/create-ad");
  };

  const renderContent = () => {
    if (loading) return <div className="loader">Загрузка...</div>;

    if (!isLoggedIn) {
      return (
        <>
          <div className="cards_container empty">
            <p>Войдите или зарегистрируйтесь, чтобы получить возможность размещать свои объявления</p>
            <BigBlueButton
              props="Войти/Зарегистироваться"
              fix="fixed"
              onClick={() => {
                sendMetrik('reachGoal', 'click_login_register_button');
                handleAuthRedirect()
              }}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <RecentFirst></RecentFirst>
        <Categories onCategoryChange={setFilterStatus} />
        <MyPropertyList filterStatus={filterStatus} />
        <BigBlueButton
          props="Разместить объявление"
          fix="fixed"
          onClick={handleButtonClick}
        />
      </>
    );
  };

  return (
    <>
      <div className="booking">
        <Header></Header>
        {renderContent()}
        <div className="bott"></div>
      </div>
    </>
  );
};

export default CreatePage;