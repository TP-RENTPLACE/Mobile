import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookingsPage from "./pages/BookingsPage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import AnnouncementPage from "./pages/AnnouncementPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AnnouncementPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;