import React from "react";
import { Routes, Route } from "react-router-dom";

// Импортируем компоненты для каждого шага
import CreateStep1 from "./CreateStep1"; // Выбор категории
import CreateStep2 from "./CreateStep2"; // Заполнение информации
import CreateStep3 from "./CreateStep3"; // Добавление фото
import CreateStep4 from "./CreateStep4"; // Описание и цена
import CreateStep5 from "./CreateStep5"; // Подтверждение

const CreateAdFlow = () => {
  return (
    <Routes>
      {/* Роутинг для создания объявления */}
      <Route index element={<CreateStep1 />} /> {/* Шаг 1 */}
      <Route path="step2" element={<CreateStep2 />} /> {/* Шаг 2 */}
      <Route path="step3" element={<CreateStep3 />} /> {/* Шаг 3 */}
      <Route path="step4" element={<CreateStep4 />} /> {/* Шаг 4 */}
      <Route path="step5" element={<CreateStep5 />} /> {/* Шаг 5 */}
    </Routes>
  );
};

export default CreateAdFlow;