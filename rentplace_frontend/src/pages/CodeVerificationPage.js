import React, { useState, useEffect } from "react";
import "./CodeVerificationPage.css";
import BigBlueButton from "../components/BigBlueButton";
import { useNavigate, useLocation } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import authService from "../api/authService";
import {toast} from "react-hot-toast";

const CodeVerificationPage = () => {
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", ""]);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const authType = location.state?.authType;

  useEffect(() => {
    if (!email) {
      navigate("/auth/email");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => setSecondsRemaining(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [secondsRemaining]);

  useEffect(() => {
    const fullCode = codeInputs.join("");

    if (fullCode.length === 5) {
      const verifyCode = async () => {
        try {
          if (authType === "AUTH_LOGIN") {
            await authService.login(email, fullCode);
            navigate("/profile");
          } else if (authType === "AUTH_REGISTER") {
            const response = await authService.validateCode(email, fullCode);

            if (response?.success === true || response?.status === "OK") {
              navigate("/auth/name", { state: { email, code: fullCode } });
            } else {
              toast.error("Неверный код");
            }
          }
        } catch (error) {
          toast.error("Неверный код или ошибка проверки");
          setCodeInputs(["", "", "", "", ""]);
        }
      };

      verifyCode();
    }
  }, [codeInputs]);


  const handleInputChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return;

    const newCodeInputs = [...codeInputs];
    newCodeInputs[index] = value;
    setCodeInputs(newCodeInputs);

    if (value !== "" && index < codeInputs.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleResendCode = async () => {
    if (!canResend) {
      alert(`Подождите ещё ${secondsRemaining} секунд`);
      return;
    }

    try {
      await authService.requestCode(email);
      setSecondsRemaining(120);
      setCanResend(false);
      setCodeInputs(["", "", "", "", ""]);
      alert("Код отправлен повторно");
    } catch (error) {
      alert("Ошибка при повторной отправке кода");
    }
  };

  return (
      <div className="code-verification-page">
        <HeadWithText props="Вход/Регистрация" />
        <div className="verification_body">
          <h2>Введите код из письма, отправленного на {email}</h2>

          <div className="code-inputs">
            {codeInputs.map((value, index) => (
                <input
                    key={index}
                    id={`input-${index}`}
                    type="number"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="code-input"
                />
            ))}
          </div>

          <p>Повторная отправка возможна через {secondsRemaining} секунд</p>

          <BigBlueButton
              onClick={handleResendCode}
              props="Отправить код повторно"
              disabled={!canResend}
          />

          <p>
            <a href="/auth/email">Ввести другую почту</a>
          </p>
        </div>
      </div>
  );
};

export default CodeVerificationPage;