import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./CreatePage.css";
import BigBlueButton from "../components/BigBlueButton";
import MyPropertyList from "../components/MyPropertyList";

const CreatePage = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("PUBLISHED");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(token && token !== "null");
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
            <Categories onCategoryChange={setFilterStatus}/>
            <div className="cards_container empty">
              <p>Войдите или зарегистрируйтесь, чтобы получить возможность размещать свои объявления</p>
              <BigBlueButton
                  props="Войти/Зарегистироваться"
                  fix="fixed"
                  onClick={handleAuthRedirect}
              />
            </div>
          </>
      );
    }

    return (
        <>
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
        <RecentFirst></RecentFirst>
        {renderContent()}
      </div>
    </>
  );
};

export default CreatePage;