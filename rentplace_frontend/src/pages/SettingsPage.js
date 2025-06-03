import {toast} from "react-hot-toast";
import HeadWithText from "../components/HeadWithText";
import "./SettingsPage.css"
import { UserRoundMinus } from 'lucide-react';

const SettingsPage = () => {

  return (
    <div className="settings-container">
      <HeadWithText props="Настройки" />
      <div className="section-item" onClick={() => toast("Данный раздел находится в разработке.")}>
        <UserRoundMinus className="delete-profile_icon"/>
        <span>Удалить профиль</span>
      </div>
    </div>
  );
};

export default SettingsPage;