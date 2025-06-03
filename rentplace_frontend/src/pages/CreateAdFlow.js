
import React from "react";
import { Routes, Route } from "react-router-dom";

import CreateStep1 from "./CreateStep1";
import CreateStep2 from "./CreateStep2";
import CreateStep3 from "./CreateStep3";
import CreateStep4 from "./CreateStep4";
import CreateStep5 from "./CreateStep5";

const CreateAdFlow = () => {
  return (
    <Routes>
      <Route index element={<CreateStep1 />} />
      <Route path="step2" element={<CreateStep2 />} />
      <Route path="step3" element={<CreateStep3 />} />
      <Route path="step4" element={<CreateStep4 />} />
      <Route path="step5" element={<CreateStep5 />} />
    </Routes>
  );
};

export default CreateAdFlow;
