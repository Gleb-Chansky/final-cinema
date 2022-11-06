import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { FilmsPage } from "./pages/FilmsPage";
import { CartoonsPage } from "./pages/CartoonsPage";
import { TopPage } from "./pages/TopPage";
import { ActorsPage } from "./pages/ActorsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewestPage } from "./pages/NewestPage";
import "./scss/style.scss";
import { GenresPage } from "./pages/GenresPage";
import { MoviePage } from "./pages/MoviePage";
import { ActorPage } from "./pages/ActorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="films" element={<FilmsPage />} />
        <Route path="cartoons" element={<CartoonsPage />} />
        <Route path="top" element={<TopPage />} />
        <Route path="newest" element={<NewestPage />} />
        <Route path="actors" element={<ActorsPage />} />
        <Route path="actor/:name" element={<ActorPage />} />
        <Route path="genres/:genre" element={<GenresPage />} />
        <Route path="movie/:name" element={<MoviePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
