import React from "react";
import "../App.css"
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpinnerComp from "./SpinnerComp";

export default function Navbaar() {
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fullscreen, setFullscreen] = useState(true);
    const [taskData, setTaskData] = useState([])
    const [imageUrls, setImageUrls] = useState()
    const [succesfullCount, setSuccesfullCount] = useState()
    const [failedCount, setFailedCount] = useState()
    const [folderId, setFolderId] = useState()

    const [taskId, setTaskId] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://34.138.136.100:3000/data', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();
                console.log(data);
                setTaskData(data);
                // set TASK IDS IN AN ARRAY TO BE USED IN THE MODAL
                const taskIds = data.map((task) => task.task_id);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    // console.log("This is the task data: ", taskData[0].id);
    const fetchImages = async (taskId) => {
        setLoading(true)
        try {
            const response = await fetch('http://34.138.136.100:3000/data/' + taskId, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            console.log(typeof (data.embeds[0].fields[3].value));
            console.log(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')));
            setImageUrls(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')))
            setSuccesfullCount(data.embeds[0].fields[1].value)
            setFailedCount(data.embeds[0].fields[2].value)
            setFolderId(data.embeds[0].fields[4].value)
            setTaskId(data.id)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false)
        }
    }
    return (
        <>
            <nav className="navbar shadow navbar-light bg-light main-navbar">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div>
                        <img src="https://ovvy.ai/frontend/images/ovvy-logo.svg" className="main-logo" alt="Ovvy Logo" ></img>
                    </div>
                    <Button className="btn btn-primary " onClick={handleShow}>
                        Task Details
                    </Button>
                </div>

            </nav>
            {/* modal content */}
            <Modal show={show} fullscreen={fullscreen} onHide={handleClose} style={{ fontFamily: "verdana" }}>
                <Modal.Header closeButton>
                    <Modal.Title ><p className="m-0 modal-main-header">View All Tasks Status and Details</p></Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 ">
                    <div className="w-100 modal-body-main d-flex justify-content-between">
                        <div className="task-button-list w-25" style={{ overflowY: "scroll", height: "72vh" }}>
                            {taskData.map((task, index) => {
                                return (
                                    <div className=" p-2 w-100 " >
                                        <button key={task.id} className=" w-100 task-details-button    mb-3" style={{ fontFamily: "verdana" }}
                                            onClick={() => fetchImages(task.id)}
                                        >
                                            Task {index + 1}
                                        </button>
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <div className="w-75 d-flex justify-content-center  px-3" style={{ overflowY: "scroll", height: "72vh" }}>
                            <div className=" mt-2 w-100 row">
                                <div className="col-md-3  p-2 ">
                                    <h3 className="task-detail-header">Task Details</h3>
                                    <hr></hr>
                                    <div>
                                        <p className="task-status-text">Successful count : {succesfullCount}</p>
                                        <p className="task-status-text">Failed count : {failedCount}
                                        </p>
                                        <p className="task-status-text">Folder ID : {folderId}
                                        </p>
                                        <p className="task-status-text">
                                            Task ID : {taskId}
                                        </p>
                                    </div>
                                </div>
                                {imageUrls && imageUrls.map((url) =>
                                (
                                    <div className="col-md-3  p-2">
                                        <img src={url} className="border rounded p-2" alt="Ovvy Logo"  ></img>
                                    </div>

                                ))}

                                {/* <h5 className="px-3">The Processed Images for the Task ID <strong className="text-primary">{loading ? <SpinnerComp /> : taskId} </strong> are displayed below </h5> */}
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <button onClick={handleClose} className=" border rounded modal-close-button">
                        Close
                    </button>

                </Modal.Footer>
            </Modal >
        </>
    )
}