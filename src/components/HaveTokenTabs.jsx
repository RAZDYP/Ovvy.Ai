import React from "react";

export default function HaveTokenTabs(props) {
    return (
        <>
            <div className="formbold-steps ">
                <ul className="formbold-steps-tabs">
                    <li className="formbold-step-menu1 active have-token-buttons">
                        <span>1</span>
                        <button value="formbold-steps-tab-authenticate "
                            className=" have-token-button" >
                            Authenticate
                        </button>
                    </li>
                    <li className="formbold-step-menu2 active">
                        <span>2</span>
                        <button value="formbold-steps-tab-upload-images"
                            className="have-token-button" >
                            Upload
                        </button>
                    </li>
                    <li className="formbold-step-menu3 active">
                        <span>3</span>
                        <button value="formbold-steps-tab-comfirmation"
                            className="have-token-button" >
                            Confirmation
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}