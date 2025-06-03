import React from "react";
import { ArrowDownUp } from 'lucide-react';
import "./RecentFirst.css"

const RecentFirst = () => {
  return (
    <div className="recent-first">
      <ArrowDownUp className="arrows"></ArrowDownUp>
      <span>Сначала недавнее</span>
    </div>
  );
};

export default RecentFirst;