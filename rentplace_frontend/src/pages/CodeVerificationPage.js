import React, { useState, useEffect, useRef } from "react";
import "./CodeVerificationPage.css";
import BigBlueButton from "../components/BigBlueButton";
import { useNavigate, useLocation } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import authService from "../api/authService";
import { toast } from "react-hot-toast";

const CodeVerificationPage = () => {
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", ""]);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const email = location.state?.email;
  const authType = location.state?.authType;

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startBlockTimer = (endTime) => {
    clearTimer();

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.round((endTime - now) / 1000);

      if (remaining <= 0) {
        clearTimer();
        setIsBlocked(false);
        localStorage.removeItem("blockTime");
        localStorage.removeItem("failedAttempts");
        setBlockTimeRemaining(0);
        return;
      }

      setBlockTimeRemaining(remaining);
    };

    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);
  };

  useEffect(() => {
    if (!email) navigate("/auth/email");

    const savedAttempts = parseInt(
      localStorage.getItem("failedAttempts") || "0"
    );
    const savedBlockTime = parseInt(localStorage.getItem("blockTime") || "0");

    setFailedAttempts(savedAttempts);

    if (savedBlockTime) {
      const remaining = Math.round((savedBlockTime - Date.now()) / 1000);
      if (remaining > 0) {
        setIsBlocked(true);
        startBlockTimer(savedBlockTime);
      } else {
        localStorage.removeItem("blockTime");
        localStorage.removeItem("failedAttempts");
      }
    }

    return clearTimer;
  }, []);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(
        () => setSecondsRemaining((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [secondsRemaining]);

  useEffect(() => {
    const fullCode = codeInputs.join("");

    if (fullCode.length === 5 && !isBlocked) {
      const verifyCode = async () => {
        try {
          setIsVerifying(true);
          if (authType === "AUTH_LOGIN") {
            await authService.login(email, fullCode);
            localStorage.removeItem("failedAttempts");
            navigate("/profile");
          } else if (authType === "AUTH_REGISTER") {
            await authService.validateCode(email, fullCode);
            localStorage.removeItem("failedAttempts");
            navigate("/auth/name", { state: { email, code: fullCode } });
          }
        } catch (error) {
          toast.error("Неверный код");
          setCodeInputs(["", "", "", "", ""]);

          setFailedAttempts((prev) => {
            const newAttempts = prev + 1;
            localStorage.setItem("failedAttempts", newAttempts);

            if (newAttempts >= 5) {
              const blockDuration = 5 * 60 * 1000;
              const unblockTime = Date.now() + blockDuration;
              localStorage.setItem("blockTime", unblockTime);
              localStorage.removeItem("failedAttempts");
              setIsBlocked(true);
              startBlockTimer(unblockTime);
              return 0;
            }
            return newAttempts;
          });
        } finally {
          setIsVerifying(false);
        }
      };

      verifyCode();
    }
  }, [codeInputs, isBlocked]);

  const handleInputChange = (index, value) => {
    if (isBlocked) return;
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
    } catch (error) {
      toast.error("Ошибка при повторной отправке кода");
    }
  };

  return (
    <div className="code-verification-page">
      <HeadWithText props="Вход/Регистрация" />
      <div className="verification_body">
        <h2>Введите код из письма, отправленного на {email}</h2>

        {isBlocked && (
          <p className="blocked-message">
            Превышено количество попыток. Повторите через {blockTimeRemaining}{" "}
            секунд.
          </p>
        )}

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
              disabled={isBlocked || isVerifying}
            />
          ))}
        </div>

        {canResend ? (
          <p className="resend-available">Повторная отправка кода доступна</p>
        ) : (
          <p>Повторная отправка возможна через {secondsRemaining} секунд</p>
        )}

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
