import React from "react";

export default function TokenTab(props) {
    return (
        <>
            <div className="form-buttons mb-4">
                <button className="formbold-confirm-btn " id="create-token-btn"
                    onClick={props.handleCreateTokenTab}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="10.5" fill="white" stroke="#DDE3EC" />
                        <g clip-path="url(#clip0_1667_1314)">
                            <path d="M10.5 5.5V16.5M5.5 10.5H16.5" stroke="#536387" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1667_1314">
                                <rect width="14" height="14" fill="white" transform="translate(4 4)" />
                            </clipPath>
                        </defs>
                    </svg>
                    Create Token
                </button>
                <button className="formbold-confirm-btn" onClick={props.handleHaveTokenTab}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="10.5" fill="white" stroke="#DDE3EC" />
                        <g clip-path="url(#clip0_1667_1314)">
                            <path
                                d="M9.83343 12.8509L15.1954 7.48828L16.0208 8.31311L9.83343 14.5005L6.12109 10.7882L6.94593 9.96336L9.83343 12.8509Z"
                                fill="#536387" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1667_1314">
                                <rect width="14" height="14" fill="white" transform="translate(4 4)" />
                            </clipPath>
                        </defs>
                    </svg>
                    Have a token?
                </button>
            </div>
        </>
    )
}