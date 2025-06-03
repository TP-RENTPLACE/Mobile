import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./EmailInputPage.css";
import BigBlueButton from "../components/BigBlueButton";
import authService from "../api/authService";
import toast from "react-hot-toast";

const EmailInputPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = async () => {
    if (!email) {
      toast.error("Введите почту");
      return;
    }

    try {
      const { authType } = await authService.requestCode(email);
      localStorage.setItem("authEmail", email);
      navigate("/auth/code", { state: { email, authType } });
    } catch (error) {
      toast.error("Ошибка при отправке кода: " + error.message);
    }
  };


  return (
      <div className="auth-page">
        <HeadWithText props="Вход/Регистрация" />
        <div className="auth-page_body">
          <h1>Введите почту. На нее будет отправлено письмо с кодом.</h1>
          <input
              type="email"
              placeholder="Введите вашу почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <BigBlueButton onClick={handleNext} props="Далее" fullwidth="fullwidth" />
        </div>
        <span className="policy">Регистрируя аккаунт, вы соглашаетесь с условиями сервиса и политикой конфиденциальности.</span>
      </div>
  );
};

export default EmailInputPage;