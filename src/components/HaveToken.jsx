import React from "react";
import { useState } from 'react';
import HaveTokenTabs from "./HaveTokenTabs";
import EnterToken from "./EnterToken";
import ImageUpload from "./ImageUpload";

export default function HaveToken(props) {
    return (
        <>
            <HaveTokenTabs />
            <EnterToken token={props.token} />
            <ImageUpload />
            <div className="formbold-form-step-2">
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