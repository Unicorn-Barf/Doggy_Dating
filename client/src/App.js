import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import CreateDog from "./pages/CreateDog";
import DogSettings from "./pages/DogSettings";
// import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/profile/:dogId"
          element={<Profile />}
        />
        <Route
          path="/signin"
          element={<Signin />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/chat"
          element={<Chat />}
        />
        <Route
          path="/create-dog"
          element={<CreateDog />}
        />
        <Route
          path="/dogs/settings"
          element={<DogSettings />}
        />
        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
