import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const StyledBar = styled('div')(({ theme }) => ({
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2),
    }
}));

export default function ProgressBar() {
    return (
        <StyledBar>
            <LinearProgress />
        </StyledBar>
    );
}
