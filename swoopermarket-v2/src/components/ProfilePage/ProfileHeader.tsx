'use client'

import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { User } from '@/types/userType';

export default function ProfileHeader({user_info} : {user_info: User}) {
    const avatarSize = 150;
    const [loggedIn, setLoggedIn] = useState(true)

    useEffect(() => {
        // Retrieve user info from local storage
        const userInfo = localStorage.getItem('userInfo');
        let user;
        if (userInfo) {
            const user_data = JSON.parse(userInfo);
            user = user_data.userid
        } else {
            user = "0"
        }

        if (user === user_info.userid) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
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
                        {user_info.first_name + " " + user_info.last_name || 'Name not available'}
                    </Typography>
                    {
                        loggedIn ? 
                        <Tooltip title="Edit Profile">
                            <IconButton href="/editProfile">
                                <EditIcon />
                            </IconButton>
                        </Tooltip> : <></>
                    }
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" spacing={5}>
                    <Typography variant="subtitle1" color="initial">
                        Email: {user_info.email || 'Email not available'}
                    </Typography>
                    <Typography variant="subtitle1" color="initial">
                        Phone: {user_info.phone || 'Phone not available'}
                    </Typography>
                </Stack>            
            </Grid>
            <Grid item xs={12}>
                {
                    user_info.bio === null ? <></> :
                    <Typography variant="body2" color="initial">
                        user_info.bio
                    </Typography>
                }
            </Grid>
        </Grid>
    )
}