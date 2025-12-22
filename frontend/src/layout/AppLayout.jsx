import { Outlet, useNavigation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AppLayout = () => {
  return (
    <div className="app-root">
      <Header />

      <main className="container content-container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
