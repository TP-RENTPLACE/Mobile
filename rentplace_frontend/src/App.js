import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookingsPage from "./pages/BookingsPage";
import CreatePage from "./pages/CreatePage"; // Старая страница /create
import ProfilePage from "./pages/ProfilePage";
import AnnouncementPage from "./pages/AnnouncementPage";
import LoadingScreen from "./components/LoadingScreen";
import EmailInputPage from "./pages/EmailInputPage";
import AuthFlow from "./pages/AuthFlow";

// Импортируем новый компонент роутинга
import CreateAdFlow from "./pages/CreateAdFlow";
import BookingForm from "./pages/BookingForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Существующие роуты */}
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/announcement" element={<AnnouncementPage />} />
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
        </Routes>

        {/* Вывод нижней навигации */}
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;