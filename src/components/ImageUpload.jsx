import React, { useEffect, useState } from "react";
import uploadImages from "../lib/firebase-storage";
import SpinnerComp from "./SpinnerComp";
import LoadingBtn from "./LoadingBtn";
import SpinnerWhite from "./SpinnerWhite";
import { Nav } from "react-bootstrap";
import Navbaar from "./Navbaar";

export default function ImageUpload(props) {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [taskIdHardCoded, setTaskIdHardCoded] = useState(['ea92ae70-0469-4f90-a4c4-df5424aeb241'])


    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const CheckValidyAndCreateToken = async () => {
            const CheckTokenValidity = async () => {
                try {
                    const response = await fetch('http://34.138.136.100:8004/tasks/' + taskIdHardCoded, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                    })
                    const data = await response.json();
                    if (data.detail === "Could not validate credentials") {
                        return { success: false, data: data };
                    }
                    else {
                        return { success: true, data: data };
                    }
                }
                catch (error) {
                    console.error('Error checking task status:', error);
                    return { success: false, data: error };
                }
            }
            const handleCreateToken = async () => {
                setLoading(true)
                await fetch('http://34.138.136.100:8004/create-token', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'business-id': 'aY3Vwu6DsN',
                        'business-api-key': 'OOT8qWJGrh',
                        'secret-key': '8bMyIurMlW',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ /* your data here */ }),
                }).then(response => response.json()).then(data => {
                    console.log(data)
                    setToken(data.access_token)
                    localStorage.setItem('token', data.access_token)
                    setLoading(false)
                }).catch(err => {
                    console.log(err)
                    setLoading(false)
                })
            }
            const tokenValidityResponse = await CheckTokenValidity()
            if (tokenValidityResponse.success) {
                console.log("Token is valid")
                console.log("this is the token", token)
                return;
            }
            else {
                console.log("Token is invalid")
                handleCreateToken()
            }
        }
        CheckValidyAndCreateToken();


    },
        []
    )

    const handleFileChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                    setSelectedImages(imagesArray);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };
    const handleImageUploadToFirebase = async (e) => {
        setLoading(true);
        const file = e.target.files;
        // make sure to convert the FileList to an Array
        const fileArray = Array.from(file);
        const urls = await uploadImages(fileArray);
        if (urls) {
            setImageList(urls);
            handleFileChange(e);
        }
        console.log(urls);
        setLoading(false);
    }
    console.log("This is the image list", imageList)


    const checkTaskStatus = async (taskId) => {
        // console.log("This is the token in checkTaskStatus", props.token, "This is the task in checkstatus", taskId)
        try {
            const response = await fetch('https://ovvyml.com/api/tasks/' + taskId, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
            const data = await response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error('Error checking task status:', error);
        }
    }


    const handleUploadImageToServer = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://ovvyml.com/api/tasks', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    images: imageList,
                    folder_id: "1234",
                    strength: 0.08
                }),
            })
            const data = await response.json();
            console.log('task_id', data)
            const taskId = data.task_id;
            props.setTaskId(taskId);
            localStorage.setItem('task_id', taskId);
            // console.log("This is the task id", taskId);
            // interval
            const interval = setInterval(async () => {
                const taskStatusData = await checkTaskStatus(taskId);
                if (taskStatusData.batch_task_status === "SUCCESS") {
                    clearInterval(interval);
                    const taskIdInterval = setInterval(async () => {
                        const response = await fetch('https://ovvyml.com/api/data/' + taskId, {
                            method: 'GET',
                            headers: {
                                'accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            mode: 'cors'
                        })
                        if (response.status === 200) {
                            clearInterval(taskIdInterval);
                            const taskData = await response.json();
                            console.log("THIS IS THE WEBHOOK TASK DATA", taskData);
                            window.location.href = "/task-details";
                            setLoading(false);

                        } else {
                            console.log("Task not ready yet");
                            setLoading(false);
                        }
                    }, 5000)
                }
            }, 2000);
        }
        catch (error) {
            console.error('Error uploading image to server:', error);
        }
    }

    return (
        <> <div className="image-upload-full">
            <Navbaar />
            <div className="w-100 d-flex align-items-center justify-content-center">
                <div className="col-md-8 image-upload-main-component">
                    <p className="upload-image-text" style={{ textAlign: "center" }}>Upload Images</p>
                    <label htmlFor="multiple-image-upload" className="w-100">
                        <div className="border rounded w-100 p-5">
                            {loading ? <SpinnerComp /> : "Please Choose Your Files to Upload"}
                        </div>
                    </label>
                    <input type="file" accept=".jpg" id="multiple-image-upload" style={{ display: "none" }} name="file" multiple onChange={handleImageUploadToFirebase} />
                    <div className="row mt-3">
                        {selectedImages.map((image, index) => (
                            <img className="p-3 col-md-4 border rounded" key={index} src={image} alt={`Selected ${index + 1}`} />
                        ))}
                    </div>
                    <div>
                        {loading ? <LoadingBtn /> : <button className="btn btn-primary mt-2 mb-3" onClick={handleUploadImageToServer}>Next</button>}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}