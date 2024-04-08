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




function AllTasksDetails() {
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
    const [inputImageUrls, setInputImageUrls] = useState([])


    const [feedback, setFeedback] = useState('')
    const [ratings, setRatings] = useState(0)

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
                // console.log(data);xxxx`
                setTaskData(data);
                // set TASK IDS IN AN ARRAY TO BE USED IN THE MODAL
                const taskIds = data.map((task) => task.task_id);
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
            const response = await fetch('http://localhost:3001/tasks/' + taskId, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            console.log("this is the image urls", data)

            setImageUrls(data.image_list)
            setSuccesfullCount(data.successfull_count)
            setFailedCount(data.failed_count)
            setFolderId(data.folder_id)
            // setInputImageUrls(data.image_list[0].input_url)
            setTaskId(data.task_id)

            // console.log(typeof (data.embeds[0].fields[3].value));
            // console.log(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')));
            // setImageUrls(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')))
            // setSuccesfullCount(data.embeds[0].fields[1].value)
            // setFailedCount(data.embeds[0].fields[2].value)
            // setFolderId(data.embeds[0].fields[4].value)
            // setInputImageUrls(data.embeds[0].fields[6].value)
            // setTaskId(data.id)

            setLoading(false)
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false)
        }
    }

    const updateFeedbackAndRating = async (taskId, imageId) => {
        try {
            const response = await fetch('http://localhost:3001/' + taskId + '/' +  imageId + '/feedback-rating', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback: feedback,
                    rating: ratings,
                    kind: "Task"
                }),
            })

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error updating feedback and rating:', error);
        }
    }
    console.log(ratings, feedback)
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
                        <div className="w-100 d-flex flex-column image-compare-main-div">
                            {
                                imageUrls && imageUrls.map((image, index) => {
                                    return (
                                        <div className="row">
                                            <div className="col-md-4 p-2 input-image-div">
                                                <h3 className="text-allign">Input</h3>
                                                <img src={image.input_url} className=" bg-white rounded p-2" alt="Ovvy Logo"  ></img>
                                            </div>
                                            <div className="col-md-4 p-2 output-image-div">
                                                <h3 className="text-allign  fs-italic">Output</h3>
                                                <img src={image.output_url} key={index} className=" bg-white rounded p-2" alt="Ovvy Logo"  ></img>
                                            </div>
                                            <div className="col-md-3 p-2 feedback-image-div">
                                                <div>
                                                    <p>Enter you feedback here</p>
                                                    <input
                                                        type="text"
                                                        value={feedback}
                                                        onChange={(e) => setFeedback(e.target.value)}
                                                        className="mb-3 form-control" />
                                                    <p className="mb-1">Rate the image</p>
                                                    <select value={ratings} key={index} onChange={(e) => setRatings(e.target.value)}
                                                        className="form-select mb-3"
                                                    >
                                                        <option value={0}>Select rating</option>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                    </select>
                                                    <button
                                                        className="update-btn-style"
                                                        onClick={() => updateFeedbackAndRating(taskId, image.image_id)}

                                                    >Update</button>



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