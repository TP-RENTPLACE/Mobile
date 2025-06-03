import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/authService";
import { useEffect, useRef, useState } from "react";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import "./ProfileEdit.css";
import { Pencil } from "lucide-react";
import userService from "../api/userService";
import defaultImage from "../assets/Avatar.png";
import { toast } from "react-hot-toast";
import { CalendarRange } from 'lucide-react';

const ProfileEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    gender: "UNSPECIFIED",
    role: "",
    birthDate: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const genderMapping = {
    male: "MALE",
    female: "FEMALE",
    "": "UNSPECIFIED",
  };

  const reverseGenderMapping = {
    MALE: "male",
    FEMALE: "female",
    UNSPECIFIED: "",
  };

  useEffect(() => {
    authService
      .getInfo()
      .then((data) => {
        setFormData({
          name: data.name || "",
          surname: data.surname || "",
          email: data.email || "",
          gender: reverseGenderMapping[data.gender] || "",
          birthDate: data.birthDate || "",
          role: data.role || "",
        });
        setPreviewImage(data.imageDTO?.url || null);
      })
      .catch((err) => {
        toast.error("Ошибка загрузки профиля:", err);
      });
  }, []);

  const handleClick = () => {
    dateInputRef.current?.showPicker();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Допустимы только .jpg и .png");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Максимальный размер изображения — 5MB");
        return;
      }
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date();
    const birthDate = new Date(formData.birthDate);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 10);

    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!formData.surname.trim()) newErrors.surname = "Введите фамилию";
    if (!formData.birthDate) newErrors.birthDate = "Укажите дату рождения";
    else if (birthDate > today)
      newErrors.birthDate = "Дата в будущем недопустима";
    else if (birthDate > minAgeDate)
      newErrors.birthDate = "Минимальный возраст — 10 лет";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Пожалуйста, исправьте ошибки перед сохранением");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("email", formData.email);
    data.append("gender", genderMapping[formData.gender] || "UNSPECIFIED");
    data.append("role", formData.role);
    data.append("birthDate", formData.birthDate);
    if (profileImage) data.append("file", profileImage);

    try {
      await userService.updateMe(data);
      toast.success("Профиль обновлён!");
      navigate("/profile");
    } catch (err) {
      toast.error("Ошибка при сохранении:", err);
    }
  };

  return (
    <div className="profile-edit-page">
      <HeadWithText props="Редактировать профиль" />
      <div className="profile-edit-page_body">
        <div className="image">
          <div className="image-container" onClick={handleImageClick}>
            <img src={previewImage || defaultImage} alt="Profile" />
            <div className="pencil-icon-container">
              <Pencil className="pencil-icon" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>
        </div>

        <span>Имя</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
        />

        <span>Фамилия</span>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Фамилия"
        />

        <span>Пол</span>
        <select
          className="sex"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="" disabled>
            Выберите пол
          </option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>

        <span>Дата рождения</span>
        <div className="custom-date-input" onClick={handleClick}>
          <input
            type="date"
            name="birthDate"
            ref={dateInputRef}
            value={formData.birthDate}
            onChange={handleChange}
            className="real-date-input"
          />
          <CalendarRange className="calendar-icon" />
        </div>

        <BigBlueButton props="Сохранить" fix="fixed" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ProfileEdit;
