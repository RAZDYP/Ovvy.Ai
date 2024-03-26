import React from 'react'
import Navbaar from './Navbaar'

function CompareImages() {
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
            const response = await fetch('http://34.138.136.100:3000/data/' + taskId, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            // console.log(typeof (data.embeds[0].fields[3].value));
            // console.log(JSON.parse(data.embeds[0].fields[3].value.replace(/'/g, '"')));
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
                        <div className="col-md-3  p-2 ">
                            <h1 className="task-detail-header">Task Details</h1>
                            <hr></hr>
                            <div>
                                <p className="task-status-text">Successful count : {loading ? <SpinnerWhite /> : succesfullCount}</p>
                                <p className="task-status-text">Failed count : {loading ? <SpinnerWhite /> : failedCount}
                                </p>
                                <p className="task-status-text">Folder ID : {loading ? <SpinnerWhite /> : folderId}
                                </p>
                                <p className="task-status-text">
                                    Task ID : {loading ? <SpinnerWhite /> : taskId}
                                </p>
                            </div>
                        </div>


                        {/* <h5 className="px-3">The Processed Images for the Task ID <strong className="text-primary">{loading ? <SpinnerComp /> : taskId} </strong> are displayed below </h5> */}
                    </div>
                    {loading ? <SpinnerWhite /> : <div className="row mt-2 p-3">
                        {imageUrls && imageUrls.map((url) =>
                        (
                            <img src={url} className=" col-md-4 bg-white rounded p-2" alt="Ovvy Logo"  ></img>
                        ))}

                    </div>}



                </div>
            </div>
        </>
    )
}

export default CompareImages