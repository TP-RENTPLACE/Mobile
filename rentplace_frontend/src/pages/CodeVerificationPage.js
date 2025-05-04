// pages/CodeVerificationPage.js
import React, { useState, useEffect } from "react";
import "./CodeVerificationPage.css"; // Стили
import BigBlueButton from "../components/BigBlueButton";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";

const CodeVerificationPage = () => {
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", ""]); // Массив для 5 инпутов
  const [email, setEmail] = useState("jonsoriginals@gmail.com"); // Пример email
  const [secondsRemaining, setSecondsRemaining] = useState(120); // Таймер
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  // Обработчик ввода в инпут
  const handleInputChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return; // Разрешаем только цифры или пустую строку

    const newCodeInputs = [...codeInputs];
    newCodeInputs[index] = value;
    setCodeInputs(newCodeInputs);

    // Автоматически переходим к следующему инпуту, если введена цифра
    if (value !== "" && index < codeInputs.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };
  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(
        () => setSecondsRemaining(secondsRemaining - 1),
        1000
      );
      return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    } else {
      setCanResend(true); // Разрешаем повторную отправку кода
    }
  }, [secondsRemaining]);
  // Обработчик повторной отправки кода
  const handleResendCode = () => {
    if (canResend) {
      alert("Код отправлен повторно!");
      setSecondsRemaining(120); // Сбрасываем таймер
      setCanResend(false); // Запрещаем повторную отправку до истечения времени
    } else {
      alert("Пожалуйста, подождите еще немного.");
    }
  };
  // Обработчик отправки кода
  const handleSubmit = () => {
    const fullCode = codeInputs.join("");
    if (fullCode.length === 5) {
      navigate("/auth/name");
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  };

  return (
    <>
      <div className="code-verification-page">
        <HeadWithText props="Вход/Регистрация" />
        <div className="verification_body">
          <h2>Введите код из письма, отправленного на {email}</h2>
          <div className="code-inputs">
            {codeInputs.map((value, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength={1} // Ограничение на 1 символ
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onFocus={(e) => e.target.select()} // Выделяем текст при фокусе
                className="code-input"
              />
            ))}
          </div>
          <p>
            {canResend ? (
              <button onClick={handleResendCode}>Отправить код повторно</button>
            ) : (
              `Повторная отправка возможна через ${secondsRemaining} секунд`
            )}
          </p>
          <BigBlueButton onClick={handleSubmit} props="Отправить" />
          <p>
            <a href="/auth/email">Ввести другую почту</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CodeVerificationPage;
