'use client'

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ProfileListings from "@/components/ProfilePage/ProfileListings";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

const avatarSize = 150;

export default function ProfilePage() {
    const [email, setEmail] = useState('');
    const [userid, setUserid] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Retrieve user info from local storage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setEmail(user.email);
            setUserid(user.userid);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPhone(user.phone);

        }
    }, []);

    return (
        <>
            <Grid container alignItems="center" direction="column" spacing={1}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '15px'}}>
                        <Avatar alt="Profile Picture" src="/images/avatar/gru.jpg" sx={{ width: avatarSize, height: avatarSize }} />
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
            <ProfileListings />
        </>
    );
};
