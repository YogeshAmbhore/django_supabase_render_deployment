import { Outlet, useNavigation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AppLayout = () => {
  //   const navigation = useNavigation();

  return (
    <>
      <Header />
      <div className="container">
        <div className="content-container">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};
