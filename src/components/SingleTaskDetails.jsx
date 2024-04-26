import React, { useEffect, useState } from "react";
import SpinnerComp from "./SpinnerComp";
import Navbaar from "./Navbaar";
// import uuid
import { v4 as uuidv4 } from 'uuid';

export default function SingleTaskDetails(props) {

    const [taskData, setTaskData] = useState([])
    const [imageUrls, setImageUrls] = useState()
    const [succesfullCount, setSuccesfullCount] = useState()
    const [failedCount, setFailedCount] = useState()
    const [folderId, setFolderId] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            console.log("This is the task id in single task details: ", localStorage.getItem('task_id'))
            try {
                const response = await fetch('https://ovvyml.com/api/data/' + localStorage.getItem('task_id'), {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();
                setTaskData(data);
                console.log("This is the task data: ", data)
                setImageUrls(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')))
                setSuccesfullCount(data.embeds[0].fields[1].value)
                setFailedCount(data.embeds[0].fields[2].value)
                setFolderId(data.embeds[0].fields[4].value)
                setLoading(false)
                await fetch(`https://ovvy-backend.onrender.com/tasks/${data.id}/image-list`, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        images: data.embeds[0].fields[6].value.map((image, index) => {
                            return {
                                image_id: uuidv4(),
                                input_url: image,
                                output_url: JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"'))[index],
                                status: 'success',
                                feedback: '',
                                ratings: 0
                            }
                        }),
                        successfull_count: data.embeds[0].fields[1].value,
                        failed_count: data.embeds[0].fields[2].value,
                        folder_id: data.embeds[0].fields[5].value,
                        kind: 'Task'
                    })
                }).then(response => response.json()).then(data => {
                    console.log(data)
                })
            }
            catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        }
        fetchData();
    }, [])




    return (
        <>
            <Navbaar />
            <div className="formbold-form-step-2">
                <div className="formbold-step-2-notifications" id="formbold-steps-tab-comfirmation">
                    <div className="w-100  ">
                        <div className=" p-3 " style={{ textAlign: "left", fontSize: "18px" }}>
                            <p className="confirmation-text">Successful count : <b>{succesfullCount}</b> </p>
                            <p className="confirmation-text">Failed count : <b>{failedCount}</b>
                            </p>
                            <p className="confirmation-text">Folder ID : <b>{folderId}</b>
                            </p>
                            <p className="confirmation-text">
                                Task ID :<b>{props.taskId}</b>
                            </p>
                        </div>
                        <div className="row p-3">
                            {imageUrls && imageUrls.map((url, index) => {
                                return (
                                    <img key={index} src={url} className="border col-md-4 p-2" alt="Ovvy Logo" ></img>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}