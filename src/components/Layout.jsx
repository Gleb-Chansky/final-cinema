import { Blur } from "./Blur/Blur";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const Layout = () => {
  const isWindowStiky = useSelector((state) => state.isWindowStiky);
  return (
    <div className={isWindowStiky === true ? "app sticky" : "app"}>
      <Blur />
      <Header />
      <section className="content">
        <div className="content__wrapper">
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
};
