import React from "react";

export default function CreateToken() {
    return (
        <>
            <div className="formbold-form-step-1 active">
                <div>
                    <div className="w-100 col-md-12 d-flex align-items-center justify-content-between">
                        <div style={{textAlign: "left"}} className="col-md-4">
                            <label for="business_id" className="formbold-form-label ">
                                Business Id
                            </label>
                            <input type="text" name="business_id" placeholder="J20djsjs" id="business_id"
                                className="form-control p-2" style={{fontSize: "large"}} />
                        </div>
                        <div style={{textAlign: "left"}} className="col-md-4 me-3 ms-3">
                            <label for="business_api_key" className="formbold-form-label">
                                Business API Key
                            </label>
                            <input type="text" name="business_api_key" placeholder="J20djsjs"
                                id="business_api_key" className="form-control p-2" style={{fontSize: "large"}} />
                        </div>
                        <div style={{textAlign: "left"}} className="col-md-4">
                            <label for="secret_key" className="formbold-form-label">
                                Secret Key
                            </label>
                            <input type="text" name="secret_key" placeholder="J20djsjs" id="secret_key"
                                className="form-control p-2" style={{fontSize: "large"}} />
                        </div>
                    </div>
                    <div className="formbold-form-btn-wrapper ">
                        <button className="formbold-btn create-token-submit-button" onclick="goToNextStep()">
                            Submit
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1675_1807)">
                                    <path
                                        d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z"
                                        fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1675_1807">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>

                    </div>
                </div>
                <div className="copy-token-btn-content">
                    <div className="mt-4 mb-5 d-flex align-items-center justify-content-between ">
                        <input id="access-token-copy" className="fw-semibold col-md-10"
                            style={{textAlign: "left", fontSize: "large"}} value="access-token">
                        </input>
                        <div>
                            <button className="btn  rounded fw-bold bg-light  d-flex align-items-center"
                                onclick="copyAccessToken()">
                                <img className="me-3"
                                    src="https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/copy-icon.png"
                                    alt="Copy" width="20" height="20"></img>
                                Copy
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}