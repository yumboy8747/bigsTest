import React, {useEffect, useState} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import * as PAGE from "./pagesImport";
import { GlobalStyle } from "../styles/global-styles";
import { NotFoundPage } from "./components/NotFoundPage/Loadable";
import { useToken } from "./hooks";
import { LogoutPage } from "./pages/AuthenticationPages/LogoutPage";
import { HomeTown } from "../CRM/organism/Main";
import { Helmet } from "react-helmet-async";


export function MainRoutes() {
  const { data: token } = useToken();
  const [scrollbarWidth, setScrollbarWidth] = useState(() => {
    return localStorage.getItem("scrollbarWidth") || "15px";
  });

  useEffect(() => {
    const container = document.querySelector(".scroll-container");

    if (container) {
      const updateWidth = () => {
        const newWidth = "20px";
        localStorage.setItem("scrollbarWidth", newWidth);
        setScrollbarWidth(newWidth);
      };
      container.addEventListener("wheel", updateWidth);

      return () => {
        container.removeEventListener("wheel", updateWidth);
      };
    }
  }, []);


  return (
    <BrowserRouter>
      <Helmet>
        <title>
          빅스홀딩스 테스트
        </title>
      </Helmet>
      
      <GlobalStyle scrollbarWidth={scrollbarWidth} />

      <Routes>
        <Route path="/login" element={<PAGE.LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={token ? <HomeTown /> : <PAGE.LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  );
}
