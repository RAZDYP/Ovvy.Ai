import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate(props) {
    const [progress, setProgress] = React.useState(0);
    // const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (props.loading) {
                setProgress((oldProgress) => {
                    // Rapidly increase progress to 50-60%
                    const targetProgress = Math.random() * 10 + 70;
                    const diff = targetProgress - oldProgress;
                    return Math.min(oldProgress + diff, 80);
                });
            } else {
                setProgress((oldProgress) => {
                    const diff = Math.random() * 2;
                    const newProgress = Math.min(oldProgress + diff, 100);
                    if (newProgress === 100) {
                        clearInterval(timer);
                    }
                    return newProgress;
                });
            }
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, [props.loading]);

    React.useEffect(() => {
        if (!props.loading) {
            // Set loading to false after 3 seconds to simulate completion
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    const diff = Math.random() * 2;
                    const newProgress = Math.min(oldProgress + diff, 100);
                    if (newProgress === 100) {
                        clearInterval(timer);
                    }
                    return newProgress;
                });
            });
        }
    }, [props.loading]);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
}
