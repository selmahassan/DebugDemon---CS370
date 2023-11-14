'use client'

import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';

export default function ProfileHeader() {
    const avatarSize = 150;

    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Retrieve user info from local storage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setEmail(user.email);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPhone(user.phone);

        }
    }, []);

    return (
        <Grid container alignItems="center" direction="column" spacing={1}>
            <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '15px'}}>
                    <Avatar alt="Profile Picture" src="/images/avatar/dooley.jpg" sx={{ width: avatarSize, height: avatarSize }} />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                    <Typography variant="h4" color="initial">
                        {first_name + " " + last_name || 'Name not available'}
                    </Typography>
                    <Tooltip title="Edit Profile">
                        <IconButton href="/editProfile">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" spacing={5}>
                    <Typography variant="subtitle1" color="initial">
                        Email: {email || 'Email not available'}
                    </Typography>
                    <Typography variant="subtitle1" color="initial">
                        Phone: {phone || 'Phone not available'}
                    </Typography>
                </Stack>            
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" color="initial">
                    Hardcoded Biography
                </Typography>
            </Grid>
        </Grid>
    )
}