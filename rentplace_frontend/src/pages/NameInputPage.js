import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/authService";
import {useState} from "react";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import "./NameInputPage.css"

const NameInputPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { email, code } = location.state;

  const handleComplete = async () => {
    if (!name || !surname) {
      alert("Заполните имя и фамилию");
      return;
    }

    try {
      await authService.register(email, code, name, surname);
      navigate("/profile");
    } catch (e) {
      alert("Ошибка при регистрации");
    }
  };

  return (
      <div className="auth-page">
        <HeadWithText props="Вход/Регистрация" />
        <div className="auth-page_body">
          <h1>Укажите имя и фамилию</h1>
          <span>Имя</span>
          <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
          <span>Фамилия</span>
          <input type="text" placeholder="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <BigBlueButton onClick={handleComplete} props="Далее" fullwidth="fullwidth" />
        </div>
      </div>
  );
};

export default NameInputPage;