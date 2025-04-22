import React from "react";
import "./AnnouncementHead.css";
import { ArrowLeft } from "lucide-react";

const AnnouncementHead = () => {
  return (
    <div>
      <div className="AnnouncementHead">
        <ArrowLeft className="icon" />
        <span>Объявление</span>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AnnouncementHead;
