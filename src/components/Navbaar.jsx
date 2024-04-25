import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { useState, useEffect } from 'react';
import notificationIcon from "../Images/notification.png"
import LogoutIcon from "../Images/logout.png"
import taskIcon from "../Images/taskicon.png"
import { Image } from "react-bootstrap";
import Link from 'react-router-dom';

export default function Navbaar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar shadow navbar-light bg-light main-navbar text-white">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div>
                        <a href="/" >
                            <img src="https://ovvy.ai/frontend/images/ovvy-logo.svg" className="main-logo" alt="Ovvy Logo" ></img>
                        </a>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-between">
                        <a href="/all-task-details" style={{ textDecoration: "none" }}>
                            <button className=" bg-transparent rounded p-1 d-flex align-items-center me-3" style={{ fontFamily: "verdana" }}>
                                <Image src={taskIcon} className="me-2" alt="task icon" width={20} />
                                <p className="m-0" >TaskList</p>

                                {/* <Image src={notificationIcon} className="notification-icon ms-2" alt="notification icon" width={20} />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontFamily: "verdana" }}>
                                    9+
                                </span> */}
                            </button>
                        </a>
                        <button className="bg-transparent rounded p-1 d-flex align-items-center" onClick={handleLogout}>
                            <Image src={LogoutIcon} className="me-2" alt="logout icon" width={20} />
                            <p className="m-0" >LogOut</p>

                        </button>
                    </div>


                </div>

            </nav>

        </>
    )
}