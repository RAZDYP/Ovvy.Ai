import React, { useEffect, useState } from "react";

export default function Confirmation(props) {

    const [taskStatus, setTaskStatus] = useState([])

    useEffect(() => {
        const handleGetStatus = async () => {
            await fetch('http://34.138.136.100:8004/tasks/' + props.taskId[0], {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token,
                },
            }).then(response => response.json()).then(statusData => {
                console.log('Task-id-status-data', statusData)
                // requestStatus = StatusData.batch_task_status;
                setTaskStatus(statusData.batch_task_status)
            }).catch(err => {
                console.log(err)
            })
        }

        handleGetStatus()
    }, [])

    return (
        <>
            <div className="formbold-form-step-2">
                <div className="formbold-step-2-notifications" id="formbold-steps-tab-comfirmation">
                    <div className="w-100 d-flex align-items-center justify-content-between">
                        <div className="col-md-9">
                            <div className="card shadow">
                                <div className="card-body">
                                    <img src="https://ovvy.ai/frontend/images/ovvy-logo.svg" alt="Ovvy Logo"
                                        width="150" height="100"></img>

                                </div>

                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary">Task 1</button>

                        </div>
                        <div className="col-md-2">

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}