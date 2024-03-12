import React from "react";

export default function HaveToken(props) {
    return (
        <>
            <div className="formbold-form-step-2">
                <div className="formbold-steps ">
                    <ul className="formbold-steps-tabs">
                        <li className="formbold-step-menu1 active">
                            <span>1</span>
                            <button value="formbold-steps-tab-authenticate"
                                className="formbold-steps-tabs-items-button" onclick="handleHaveTokenTab()">
                                Authenticate
                            </button>
                        </li>
                        <li className="formbold-step-menu2">
                            <span>2</span>
                            <button value="formbold-steps-tab-upload-images"
                                className="formbold-steps-tabs-items-button" onclick="handleHaveTokenTab()">
                                Upload Images
                            </button>
                        </li>
                        <li className="formbold-step-menu3">
                            <span>3</span>
                            <button value="formbold-steps-tab-comfirmation"
                                className="formbold-steps-tabs-items-button" onclick="handleHaveTokenTab()">
                                Confirmation/Notification
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="formbold-form-step-2-authenticate" id="formbold-steps-tab-authenticate">
                    <div>
                        <label for="token" className="formbold-form-label"> Enter your Authentication Token:
                        </label>
                        <textarea rows="6" name="token" id="message" placeholder="Enter your Token ..."
                            className="formbold-form-input" value={props.token}></textarea>
                    </div>
                    <div>
                        <button className="btn btn-primary mt-2 mb-3" onclick="getToken()">Next</button>
                    </div>
                </div>
                <div className="formbold-form-step-2-images-upload hidden"
                    id="formbold-steps-tab-upload-images">
                    <div className="w-100">
                        <label for="multiple-image-upload" className="w-100">
                            <div className="border rounded w-100 p-5">
                                Choose Images to Upload
                            </div>
                        </label>
                        <input type="file" id="multiple-image-upload" style={{ display: "none" }} name="file"
                            multiple onchange="previewImages()"></input>
                    </div>
                    <div id="imagePreview" className="preview-container"></div>
                    <div>
                        <button className="btn btn-primary mt-2 mb-3" onclick="uploadImages()">Next</button>
                    </div>
                </div>
                <div className="formbold-step-2-notifications hidden" id="formbold-steps-tab-comfirmation">
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