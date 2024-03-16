import React from "react";

export default function HaveTokenTabs(props) {
    return (
        <>
            <div className="formbold-steps ">
                <ul className="formbold-steps-tabs">
                    <li className="formbold-step-menu1 active">
                        <span>1</span>
                        <button value="formbold-steps-tab-authenticate "
                            className="btn btn-outline-primary" onclick="handleHaveTokenTab()">
                            Authenticate
                        </button>
                    </li>
                    <li className="formbold-step-menu2">
                        <span>2</span>
                        <button value="formbold-steps-tab-upload-images"
                            className="btn  btn-outline-primary" onclick="handleHaveTokenTab()">
                            Upload Images
                        </button>
                    </li>
                    <li className="formbold-step-menu3">
                        <span>3</span>
                        <button value="formbold-steps-tab-comfirmation"
                            className="btn  btn-outline-primary" onclick="handleHaveTokenTab()">
                            Confirmation/Notification
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}