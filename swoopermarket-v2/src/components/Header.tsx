import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
            <Typography variant="h5" sx={{color: "#0033a0"}}></Typography>
        </Grid>
    )
}