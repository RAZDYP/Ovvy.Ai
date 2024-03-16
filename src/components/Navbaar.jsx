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

    // make a call to get data from the server and set it to the state
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
            <nav className="navbar  navbar-light bg-light p-4">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <img src="https://ovvy.ai/frontend/images/ovvy-logo.svg" alt="Ovvy Logo" width="250" height="100"></img>
                    <button variant="primary" onClick={handleShow}>
                        Launch demo modal
                    </button>
                </div>

            </nav>
            {/* modal content */}
            <Modal show={show} fullscreen={fullscreen} onHide={handleClose} style={{ fontFamily: "verdana" }}>
                <Modal.Header closeButton>
                    <Modal.Title>View All Tasks Status and Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100 py-2 d-flex ">
                        <div className="col-md-2 d-flex flex-column  p-2 " style={{ overflowY: "scroll", height: "72vh" }}>
                            {taskData.map((task) => {
                                return (
                                    <div className="col-md-12 p-2 " >
                                        <button key={task.id} className="btn btn-outline-primary border-2 mb-3" style={{ fontSize: "14px" }}
                                            onClick={() => fetchImages(task.id)}
                                        >
                                            {task.id}
                                        </button>
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <div className="col-md-10 d-flex  m-3">
                            <div className="col-md-8 pe-2 row">
                                <h5 className="px-3">The Processed Images for the Task ID <strong className="text-primary">{loading ? <SpinnerComp /> : taskId} </strong> are displayed below </h5>
                                {imageUrls && imageUrls.map((url) => {
                                    return (
                                        <div className="col-md-4 p-2">
                                            {loading ? <div style={{ zIndex: "5", position: "absolute", top: "50%", left: "50%" }}>
                                                <SpinnerComp />
                                            </div> : <img src={url} alt="Ovvy Logo" height="150" width="250" ></img>}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="col-md-4">
                                <h3>Task Details</h3>
                                <hr></hr>
                                <div>
                                    <p className="mb-4">Successful count : {succesfullCount}</p>
                                    <p className="mb-4">Failed count : {failedCount}
                                    </p>
                                    <p className="mb-4">Folder ID : {folderId}
                                    </p>
                                    <p className="mb-4">
                                        Task ID : {taskId}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}