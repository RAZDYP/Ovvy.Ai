import React, { useEffect, useState } from "react";
import SpinnerComp from "./SpinnerComp";

export default function Confirmation(props) {

    const [taskData, setTaskData] = useState([])
    const [imageUrls, setImageUrls] = useState()
    const [succesfullCount, setSuccesfullCount] = useState()
    const [failedCount, setFailedCount] = useState()
    const [folderId, setFolderId] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch('http://34.138.136.100:3000/data/' + props.taskId, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();
                setTaskData(data);
                setImageUrls(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')))
                setSuccesfullCount(data.embeds[0].fields[1].value)
                setFailedCount(data.embeds[0].fields[2].value)
                setFolderId(data.embeds[0].fields[4].value)
                setLoading(false)
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
            <div className="formbold-form-step-2">
                <div className="formbold-step-2-notifications" id="formbold-steps-tab-comfirmation">
                    <div className="w-100 d-flex align-items-center justify-content-between">
                        <div className="col-md-8 row p-3">
                            {imageUrls && imageUrls.map((url) => {
                                return (
                                    <div className=" border rounded p-2">
                                        {loading ? <div style={{ zIndex: "5", position: "absolute", top: "50%", left: "50%" }}>
                                            <SpinnerComp />
                                        </div> : <img src={url} alt="Ovvy Logo" ></img>}
                                    </div>
                                )
                            })}

                        </div>
                        <div className="col-md-4 p-3 " style={{ textAlign: "left", fontSize: "18px" }}>
                            <p className="mb-4">Successful count :<b>{succesfullCount}</b> </p>
                            <p className="mb-4">Failed count : <b>{failedCount}</b>
                            </p>
                            <p className="mb-4">Folder ID : <b>{folderId}</b>
                            </p>
                            <p className="mb-4">
                                Task ID :<b>{props.taskId}</b>
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}