import React, { useState } from "react";
import uploadImages from "../lib/firebase-storage";

export default function ImageUpload(props) {

    const [files, setFiles] = useState([]);
    const [imageList, setImageList] = useState([]);


    const handleImageUploadToFirebase = async (e) => {
        const file = e.target.files;
        // make sure to convert the FileList to an Array
        const fileArray = Array.from(file);
        const urls = await uploadImages(fileArray);
        console.log(urls);
        setImageList(urls);
    }

    const handleUploadImageToServer = async () => {
        await fetch('http://34.138.136.100:8004/tasks', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                },
                body: JSON.stringify({
                    images: imageList,
                    folder_id: "1234",
                    strength: 0.08
                }),
            }).then(response => response.json()).then(data => {
                console.log('task_id', data)
                const taskId = data.task_id;
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="formbold-form-step-2-images-upload"
                    id="formbold-steps-tab-upload-images">
                    <div className="w-100">
                        <label for="multiple-image-upload" className="w-100">
                            <div className="border rounded w-100 p-5">
                                Choose Images to Upload
                            </div>
                        </label>
                        <input type="file" id="multiple-image-upload" style={{ display: "none" }} name="file"
                            multiple onChange={handleImageUploadToFirebase} ></input>
                    </div>
                    <div id="imagePreview" className="preview-container"></div>
                    <div>
                        <button className="btn btn-primary mt-2 mb-3" onClick={handleUploadImageToServer}>Next</button>
                    </div>
                </div>
        </>
    )
}