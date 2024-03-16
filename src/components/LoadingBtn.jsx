import React from 'react'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function LoadingBtn() {
    return (
        <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>
    )
}

export default LoadingBtn