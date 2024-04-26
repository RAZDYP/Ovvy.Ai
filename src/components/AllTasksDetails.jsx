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
                const response = await fetch('http://34.138.136.100:3000/data', {
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

    const fetchImagesAndFeedbacks= async (taskId) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
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

            const feedbackAndRatings = await fetch(`http://localhost:3001/${taskId}/feedback-rating`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            const feedbackAndRatingsData = await feedbackAndRatings.json();
            console.log(feedbackAndRatingsData);
            // { image_id: { feedback: '...', ratings: 0 } }
            setImagesFeedbackAndRatings(
                feedbackAndRatingsData.reduce((acc, { image_id, feedback, ratings }) => {
                    acc[image_id] = { feedback, ratings };
                    return acc;
                }, {})
            );
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false)
        }
    }

    console.log(imagesFeedbackAndRatings);

    const updateFeedbackAndRating = async (taskId, imageId) => {
        try {
            const response = await fetch(`http://localhost:3001/${taskId}/${imageId}/feedback-rating`, {
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
                ratings: prevState[imageId]?.ratings || 0,
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

            <div className="w-100 modal-body- p-0 d-flex justify-content-between">

                <div className="task-button-list bg-white" >
                    {taskData.map((task, index) => {
                        return (
                            <div className=" p-2 w-100 " >
                                <button key={task.id} className=" w-100 log-in-btn   border-0 mb-3" style={{ fontFamily: "verdana" }}
                                    onClick={() => fetchImagesAndFeedbacks(task.id)}
                                >
                                    Task {index + 1}
                                </button>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="task-details-main-content " >
                    <div className="mt-2 w-100 text-white ">
                        <h1 className="task-detail-header">Task Details</h1>
                        <hr></hr>
                        <div className="task-details-content-details w-100">
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

                        <div className=" row  image-compare-main-div">
                            {
                                imageUrls.map((image, index) => {
                                    return (
                                        <div className="col-md-12 task-details-main-image-div border rounded-3">
                                            <div className="input-image-div mb-2">
                                                <h3 className="text-allign-left" style={{ fontFamily: "verdana" }}>Input</h3>
                                                <img src={image.input_url} className=" bg-white rounded p-2" alt="Ovvy Logo" ></img>
                                            </div>
                                            <div className="output-image-div mb-2">
                                                <h3 className="text-allign-left  fs-italic" style={{ fontFamily: "verdana" }}>Output</h3>
                                                <img src={image.output_url} className=" bg-white rounded p-2" alt="Ovvy Logo" ></img>
                                            </div>
                                            <div className="image-feedback-div mb-2">
                                                <div>
                                                    <Typography style={{ fontFamily: "verdana" }} component="legend" className="mb-2">Enter feedback for the image</Typography>
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