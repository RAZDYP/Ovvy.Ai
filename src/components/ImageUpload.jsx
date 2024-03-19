import React, { useState } from "react";
import uploadImages from "../lib/firebase-storage";
import SpinnerComp from "./SpinnerComp";
import LoadingBtn from "./LoadingBtn";
import SpinnerWhite from "./SpinnerWhite";

export default function ImageUpload(props) {
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

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
            props.setImageList(urls);
            handleFileChange(e);
        }
        console.log(urls);
        props.setImageList(urls);
        setLoading(false);
    }

    const checkTaskStatus = async (taskId) => {
        console.log("This is the token in checkTaskStatus", props.token, "This is the task in checkstatus", taskId)
        try {
            const response = await fetch('https://ovvyml.com/api/tasks/' + taskId, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
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
                    'Authorization': 'Bearer ' + props.token,
                },
                body: JSON.stringify({
                    images: props.imageList,
                    folder_id: "1234",
                    strength: 0.08
                }),
            })
            const data = await response.json();
            console.log('task_id', data)
            const taskId = data.task_id;
            props.setTaskId([...props.taskId, taskId]);

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
                            setLoading(false);
                            props.handleNextStep();

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
        <>
            <div className="formbold-form-step-2-images-upload" id="formbold-steps-tab-upload-images">
                <div className="w-100">
                    <p className="upload-image-text" style={{ textAlign: "center" }}>Upload Images</p>
                    <label htmlFor="multiple-image-upload" className="w-100">
                        <div className="border rounded w-100 p-5">
                            {loading ? <SpinnerComp /> : "Please Choose Your Files to Upload"}
                        </div>
                    </label>
                    <input type="file" accept=".jpg" id="multiple-image-upload" style={{ display: "none" }} name="file" multiple onChange={handleImageUploadToFirebase} />
                </div>
                <div className="row mt-3">
                    {selectedImages.map((image, index) => (
                        <div className="p-2  rounded-4 col-md-4" key={index}>
                            <img className="p-2 border rounded" src={image} alt={`Selected ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div id="imagePreview" className="preview-container"></div>
                <div>
                    {loading ? <LoadingBtn /> : <button className="btn btn-primary mt-2 mb-3" onClick={handleUploadImageToServer}>Next</button>}
                </div>
            </div>
        </>
    );
}