import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookingsPage from "./pages/BookingsPage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import AnnouncementPage from "./pages/AnnouncementPage";
import LoadingScreen from "./components/LoadingScreen";
import AuthFlow from "./pages/AuthFlow";
import CreateAdFlow from "./pages/CreateAdFlow";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";
import FiltersPage from "./pages/FiltersPage";
import DestinationInput from "./pages/DestinationInput";
import ProfileEdit from "./pages/ProfileEdit";
import {Toaster} from "react-hot-toast";

function AppContent() {
  const location = useLocation();
  const hideBottomNavPaths = ['/filters', '/auth','/destination'];

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/announcement/:id" element={<AnnouncementPage />} />
        <Route path="/auth/*" element={<AuthFlow />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/create-ad/*" element={<CreateAdFlow />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/destination" element={<DestinationInput />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
      </Routes>

      {!hideBottomNavPaths.includes(location.pathname) && <BottomNavigation />}
    </>
  );
}

function App() {
  return (
      <>
        <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#fff',
                color: '#333',
                fontSize: '14px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#4caf50',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#f44336',
                  secondary: '#fff',
                },
              },
            }}
        />
        <Router>
          <div className="App">
            <AppContent/>
          </div>
        </Router>
      </>
  );
}

export default App;