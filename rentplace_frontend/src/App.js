import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookingsPage from "./pages/BookingsPage";
import CreatePage from "./pages/CreatePage"; // Старая страница /create
import ProfilePage from "./pages/ProfilePage";
import AnnouncementPage from "./pages/AnnouncementPage";
import LoadingScreen from "./components/LoadingScreen";
import AuthFlow from "./pages/AuthFlow";

import CreateAdFlow from "./pages/CreateAdFlow";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/announcement/:id" element={<AnnouncementPage />} />
          <Route path="/auth/*" element={<AuthFlow />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Старая страница /create */}
          <Route path="/create" element={<CreatePage />} />

          {/* Новый роутинг для создания объявления */}
          <Route path="/create-ad/*" element={<CreateAdFlow />} />
          {/* Страница бронирования */}
          <Route path="/booking-form" element={<BookingForm />} />

          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>

        {/* Вывод нижней навигации */}
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;