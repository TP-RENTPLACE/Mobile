import React from "react";
import "./FacilityTable.css";

const FacilityTable = ({ facilities, title, selected = [], onToggle }) => {
    const rows = [];
    for (let i = 0; i < facilities.length; i += 3) {
        rows.push(facilities.slice(i, i + 3));
    }

    return (
        <div className="category-grid">
            <h2>{title}</h2>
            <div className="grid-container">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {row.map((facility) => {
                            const isActive = selected.includes(facility.id);
                            return (
                                <div
                                    key={facility.id}
                                    className={`grid-item ${isActive ? "active" : ""}`}
                                    onClick={() => onToggle(facility.id)}
                                >
                                    {facility.name}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacilityTable;