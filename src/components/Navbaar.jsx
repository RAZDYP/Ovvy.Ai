import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpinnerComp from "./SpinnerComp";
import notificationIcon from "../Images/notification.png"
import { Image } from "react-bootstrap";
import Link from 'react-router-dom';

export default function Navbaar() {
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        navigate('/login')
    }



    return (
        <>
            <nav className="navbar shadow navbar-light bg-light main-navbar text-white">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div>
                        <a href="/upload-images" >
                            <img src="https://ovvy.ai/frontend/images/ovvy-logo.svg" className="main-logo" alt="Ovvy Logo" ></img>
                        </a>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-between">
                        <a href="/all-task-details" >
                            <button className="position-relative border-0 bg-transparent me-3" style={{ fontFamily: "verdana" }}>
                                Archive
                                <Image src={notificationIcon} className="notification-icon ms-2" alt="notification icon" width={20} />
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontFamily: "verdana" }}>
                                    9+
                                </span>
                            </button>
                        </a>
                        <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
                    </div>


                </div>

            </nav>

        </>
    )
}