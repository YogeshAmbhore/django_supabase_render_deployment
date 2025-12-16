import { Routes, Route } from "react-router-dom";
import { AuthorsData } from "../components/AuthorsData";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthorsData />} />
    </Routes>
  );
};
