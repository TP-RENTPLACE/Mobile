import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/authService";
import { useRef, useState } from 'react';
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import "./ProfileEdit.css";
import { Pencil } from "lucide-react";

const ProfileEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const dateInputRef = useRef(null);

  const handleClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Не выбрана";
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="profile-edit-page">
      <HeadWithText props="Редактировать профиль" />
      <div className="profile-edit-page_body">
        <div className="image">
          <div className="image-container">
            <img src="./images/profile.png" alt="Profile" />
            <div className="pencil-icon-container">
              <Pencil className="pencil-icon" />
            </div>
          </div>
        </div>
        <span>Имя</span>
        <input type="text" placeholder="Имя" />
        <span>Фамилия</span>
        <input type="text" placeholder="Фамилия" />
        <span>Пол</span>
        <select className="sex">
          <option value="" disabled selected>
            Выберите пол
          </option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        <span>Дата рождения</span>
        <div className="custom-date-input" onClick={handleClick}>
      <input
        type="date"
        ref={dateInputRef}
        className="real-date-input"
        onChange={handleDateChange}
        value={selectedDate}
      />
      <div className={`date-display ${selectedDate ? 'has-value' : ''}`}>
        <span className="date-text">
          {formatDisplayDate(selectedDate)}
        </span>
        <span className="calendar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
      </div>
    </div>

        <BigBlueButton props="Сохранить" fullwidth="fullwidth" />
      </div>
    </div>
  );
};

export default ProfileEdit;
