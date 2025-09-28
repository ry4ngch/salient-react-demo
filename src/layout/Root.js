import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Layout/Footer";

const Root = () => {
    // Get the current year dynamically
	const currentYear = new Date().getFullYear();
    
    return (
        <div id='wrapper'>
            <Header>
                <Navbar />
            </Header>
            <div id='page-wrapper'>
                <div className="container-fluid">
                    <Outlet/>
                </div>
            </div>
            <Footer>
                <p>&copy; {currentYear} Ryan Goh. All rights reserved.</p>
            </Footer>
        </div>
    )
}

export default Root;