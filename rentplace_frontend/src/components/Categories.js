import React from 'react';
import './Categories.css';
import { Building } from 'lucide-react'; // Пример импорта компонента
import { WavesLadder } from 'lucide-react';
import { Waves } from 'lucide-react';

const categories = [
  { id: 1, name: 'Квартиры', icon: <Building className='icon' /> },
  { id: 2, name: 'Дома с бассейном', icon: <WavesLadder className='icon' /> },
  { id: 3, name: 'Рядом с морем', icon: <Waves className='icon' /> },
];

const Categories = () => {
  const [activeCategoryId, setActiveCategoryId] = React.useState(2); // Активная категория по умолчанию

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <span
          key={category.id}
          className={`category ${activeCategoryId === category.id ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.icon} 
          <span>{category.name}</span>
          
        </span>
      ))}
    </div>
  );
};

export default Categories;