import React from "react";
import { useState } from 'react';
import HaveTokenTabs from "./HaveTokenTabs";
import EnterToken from "./EnterToken";
import ImageUpload from "./ImageUpload";
import Confirmation from "./SingleTaskDetails";

export default function HaveToken(props) {

    const [currentStep, setCurrentStep] = useState(1)
    const [taskId, setTaskId] = useState([])
    const [imageList, setImageList] = useState([]);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1)
    }
    console.log("This is the image list: ", imageList)
    console.log("This is the task id: ", taskId)
    return (
        <>
            <HaveTokenTabs />
            {currentStep === 1 && <EnterToken token={props.token} handleNextStep={handleNextStep} />}
            {currentStep === 2 && <ImageUpload token={props.token} handleNextStep={handleNextStep} setTaskId={setTaskId} setImageList={setImageList} imageList={imageList} taskId={taskId} />}
            {currentStep === 3 && <Confirmation token={props.token} handleNextStep={handleNextStep} taskId={taskId} imageList={imageList} />}
        </>
    )
}