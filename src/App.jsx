import React from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
