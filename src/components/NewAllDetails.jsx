import React from "react";
import "../App.css"
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpinnerComp from "./SpinnerComp";
import SpinnerWhite from "./SpinnerWhite";
import notificationIcon from "../Images/notification.png"
import { Image, Nav } from "react-bootstrap";
import Navbaar from "./Navbaar";

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function AllTasksDetails() {
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fullscreen, setFullscreen] = useState(true);
    const [taskData, setTaskData] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [succesfullCount, setSuccesfullCount] = useState()
    const [failedCount, setFailedCount] = useState()
    const [folderId, setFolderId] = useState()
    const [taskId, setTaskId] = useState()

    const [imagesFeedbackAndRatings, setImagesFeedbackAndRatings] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch('https://ovvyml.com/api/data/', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();
                setTaskData(data);
                setLoading(false)
            }
            catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    const fetchImages = async (taskId) => {
        setLoading(true)
        try {
            const response = await fetch(`https://ovvy-backend.onrender.com/tasks/${taskId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            setImageUrls(data.image_list)
            setSuccesfullCount(data.successfull_count)
            setFailedCount(data.failed_count)
            setFolderId(data.folder_id)
            setTaskId(data.task_id)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false)
        }
    }

    const updateFeedbackAndRating = async (taskId, imageId) => {
        try {
            const response = await fetch(`https://ovvy-backend.onrender.com/${taskId}/${imageId}/feedback-rating`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback: imagesFeedbackAndRatings[imageId].feedback,
                    ratings: imagesFeedbackAndRatings[imageId].ratings,
                    kind: "Task"
                }),
            })

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating feedback and rating:', error);
        }
    }

    const handleFeedbackChange = (imageId, value) => {
        setImagesFeedbackAndRatings((prevState) => ({
            ...prevState,
            [imageId]: {
                ...prevState[imageId],
                feedback: value,
            },
        }));
    };

    const handleRatingChange = (imageId, value) => {
        setImagesFeedbackAndRatings((prevState) => ({
            ...prevState,
            [imageId]: {
                ...prevState[imageId],
                ratings: value,
            },
        }));
    };

    return (
        <>
            <Navbaar />
            <div className="w-100 modal-body-main d-flex justify-content-between">
                <div className="task-button-list bg-white w-25" >
                    {taskData.map((task, index) => {
                        return (
                            <div className=" p-2 w-100 " >
                                <button key={task.id} className=" w-100 log-in-btn   border-0 mb-3" style={{ fontFamily: "verdana" }}
                                    onClick={() => fetchImages(task.id)}
                                >
                                    Task {index + 1}
                                </button>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="w-75 task-button-list" >
                    <div className=" p-3 mt-2 w-100 text-white row">
                        <div className="col-md-12  p-2 ">
                            <h1 className="task-detail-header">Task Details</h1>
                            <hr></hr>
                            <div className="d-flex   justify-content-between w-100">
                                <p className="task-status-text m-0">Successful count : {loading ? <SpinnerWhite /> : succesfullCount}</p>
                                <p className="task-status-text m-0">Failed count : {loading ? <SpinnerWhite /> : failedCount}
                                </p>
                                <p className="task-status-text m-0">Folder ID : {loading ? <SpinnerWhite /> : folderId}
                                </p>
                                <p className="task-status-text m-0">
                                    Task ID : {loading ? <SpinnerWhite /> : taskId}
                                </p>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="w-100 row  image-compare-main-div">
                            {
                                imageUrls.map((image, index) => {
                                    return (
                                        <div className="col-md-12 d-flex justify-content-between align-items-center border rounded-3 p-3">
                                            <div className="col-md-4 p-2 input-image-div">
                                                <h3 className="text-allign-left" style={{ fontFamily: "verdana" }}>Input</h3>
                                                <img src={image.input_url} className=" bg-white rounded p-2" alt="Ovvy Logo" ></img>
                                            </div>
                                            <div className="col-md-4 p-2 output-image-div">
                                                <h3 className="text-allign-left  fs-italic" style={{ fontFamily: "verdana" }}>Output</h3>
                                                <img src={image.output_url} className=" bg-white rounded p-2" alt="Ovvy Logo" ></img>
                                            </div>
                                            <div className="col-md-3 p-2 ">
                                                <div>
                                                    <p className="f" style={{ fontFamily: "verdana" }}>Enter your feedback here</p>
                                                    <textarea
                                                        type="text"
                                                        value={imagesFeedbackAndRatings[image.image_id]?.feedback || ''}
                                                        onChange={(e) => handleFeedbackChange(image.image_id, e.target.value)}
                                                        className=" form-control" />
                                                    <Box
                                                        sx={{
                                                            '& > legend': { mt: 2 },
                                                        }}
                                                    >
                                                        <Typography style={{ fontFamily: "verdana" }} component="legend">Rate the image</Typography>
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={imagesFeedbackAndRatings[image.image_id]?.ratings || 0}
                                                            onChange={(e) => handleRatingChange(image.image_id, e.target.value)}
                                                            size="large"
                                                        />
                                                    </Box>
                                                    <button
                                                        className="update-btn-style mt-2"
                                                        onClick={() => updateFeedbackAndRating(taskId, image.image_id)}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>

                                        </div>


                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllTasksDetails