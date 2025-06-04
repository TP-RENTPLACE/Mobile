import { useState } from "react";
import HeadWithText from "../components/HeadWithText";
import "./SettingsPage.css";
import { UserRoundMinus } from 'lucide-react';
import UserService from "../api/userService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDeleteProfile = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить профиль?")) {
            return;
        }

        setIsDeleting(true);
        try {
            await UserService.deleteMe();

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("authEmail");

            toast.success("Профиль успешно удален");
            navigate("/profile");
        } catch (error) {
            toast.error("Не удалось удалить профиль");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="settings-container">
            <HeadWithText props="Настройки" />
            <div
                className={`section-item ${isDeleting ? "disabled" : ""}`}
                onClick={isDeleting ? undefined : handleDeleteProfile}
            >
                <UserRoundMinus className="delete-profile_icon" />
                <span>
          {isDeleting ? "Удаление..." : "Удалить профиль"}
        </span>
            </div>
        </div>
    );
};

export default SettingsPage;