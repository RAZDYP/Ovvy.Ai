import React from "react";

export default function ImageUpload(props) {
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
                            multiple onchange="previewImages()"></input>
                    </div>
                    <div id="imagePreview" className="preview-container"></div>
                    <div>
                        <button className="btn btn-primary mt-2 mb-3" onClick={props.handleNextStep}>Next</button>
                    </div>
                </div>
        </>
    )
}