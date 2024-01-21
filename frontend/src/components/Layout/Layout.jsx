import React, { Fragment } from "react";
import Routers from "../../Routers/Routers";
import { AuthProvider } from "../../utils/Authcontext";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
    return (
        <AuthProvider>
            <Fragment>
                <Navbar/>
                <div>
                    <Routers/>
                </div>
                <Footer/>
            </Fragment>
        </AuthProvider>
    )
}