import * as React from "react";
import { Route } from "react-router-dom";
import VideoPoster from "../features/navigation/VideoPoster";
import Video from "../features/navigation/Video";
import CookieConsent from "../features/cookie/CookieConsent";
import NavigationPage from "../features/navigation/NavigationPage";
import NavigationBar from "../features/navigation/NavigationBar";
import Main from "./Main";
import CookieModal from "../features/cookie/CookieModal";
import Footer from "./Footer";
import "./AppStyles.scss";

export default function App() {   

    return (
        <div className="position-relative min-vh-100">
            <Route
                path="/"
                render={route => {
                    return (
                        <>
                            <VideoPoster route={route} />
                            <Video route={route} />
                            <NavigationPage />
                            <NavigationBar />
                            <Main />
                            <Footer />
                            <CookieModal />
                            <CookieConsent />
                        </>
                    );
                }}
            />
        </div>
    );
}