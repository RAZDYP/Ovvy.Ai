import React from "react";

export default function EnterToken(props) {
    return (
        <>
            <div className="formbold-form-step-2-authenticate" id="formbold-steps-tab-authenticate">
                <div>
                    <label for="token" className="formbold-form-label"> Enter your Authentication Token:
                    </label>
                    <textarea rows="6" name="token" id="message" placeholder="Enter your Token ..."
                        className="formbold-form-input" value={props.token}></textarea>
                </div>
                <div>
                    <button className="btn btn-primary mt-2 mb-3" onClick={props.handleNextStep}>Next</button>
                </div>
            </div>
        </>
    )
}