import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/authService";
import {useState} from "react";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import "./NameInputPage.css"
import {toast} from "react-hot-toast";

const NameInputPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { email, code } = location.state;

  const validateFields = () => {
    const errors = [];
    const nameRegex = /^[A-Za-zА-Яа-я\s'-]+$/;

    if (!name.trim()) {
      errors.push("Имя: поле обязательно для заполнения");
    } else {
      if (!nameRegex.test(name)) {
        errors.push("Имя: содержит недопустимые символы");
      }
      if (name.length < 2) {
        errors.push("Имя: должно содержать минимум 2 символа");
      }
      if (name.length > 30) {
        errors.push("Имя: не должно превышать 30 символов");
      }
    }

    if (!surname.trim()) {
      errors.push("Фамилия: поле обязательно для заполнения");
    } else {
      if (!nameRegex.test(surname)) {
        errors.push("Фамилия: содержит недопустимые символы");
      }
      if (surname.length < 2) {
        errors.push("Фамилия: должна содержать минимум 2 символа");
      }
      if (surname.length > 50) {
        errors.push("Фамилия: не должна превышать 50 символов");
      }
    }

    errors.forEach(error => toast.error(error));
    return errors.length === 0;
  };

  const handleComplete = async () => {
    if (!validateFields()) return;

    try {
      await authService.register(email, code, name, surname);
      navigate("/profile");
    } catch (e) {
      toast.error("Ошибка при регистрации");
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