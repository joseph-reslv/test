import React, { useEffect } from 'react';
// Styles
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';
// Worker
import countWorker from 'workers/count.worker';
import workerWrapper from 'utils/workerWrapper';

const MainPageContainer = styled('div')({
    overflowY: 'hidden',
});

const MainPage: React.FC = () => {
    const w = new workerWrapper(new countWorker());
    useEffect(() => {
        (async () => {
            const msg = await w.request('start');
            console.log(msg);
        })();
    }, []);

    return (
        <MainPageContainer>
            <Typography variant="h1">Heading sss1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="body1">
                <b>Google API:</b> {process.env.GOOGLE_MAP_API_KEY}
            </Typography>
            <Typography variant="body2">
                <b>Site Domain:</b> {process.env.PUBLIC_URL}
            </Typography>
        </MainPageContainer>
    );
};

export default MainPage;
