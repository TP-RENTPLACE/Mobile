import React from "react";
import "./CategoryTable.css"; // Ссылка на CSS файл

const CategoryTable = ({categories,title}) => {
  
 // Разделяем массив на группы по 3 элемента
 const rows = [];
 for (let i = 0; i < categories.length; i += 3) {
   rows.push(categories.slice(i, i + 3));
 }

 return (
   <div className="category-grid">
     <h2>{title}</h2>
     <div className="grid-container">
       {rows.map((row, rowIndex) => (
         <div key={rowIndex} className="grid-row">
           {row.map((category, index) => (
             <div key={index} className="grid-item">
               {category}
             </div>
           ))}
         </div>
       ))}
     </div>
   </div>
 );
};

export default CategoryTable;