'use client'

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ProfileListings from "@/components/ProfilePage/ProfileListings"; // Ensure correct import path
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { userInfo } from 'os';

const avatarSize = 200;

const ProfilePage = () => {
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
            setEmail(user.email); // Set the email in state
            setUserid(user.userid);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPhone(user.phone);

        }
    }, []);

    if (!userInfo) {
        return <div>Please log in to view this page.</div>;
      }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <div>
                <Stack direction="column" spacing={1} alignItems="center">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Avatar alt="Profile Picture" src="/images/avatar/gru.jpg" sx={{ width: avatarSize, height: avatarSize }} />
                    </div>
                    <Tooltip title="Edit Profile">
                        <IconButton href="/editProfile">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Rating name="read-only" defaultValue={1.5} precision={0.5} readOnly />
                    <Typography variant="h4" color="initial">
                    {first_name + " " + last_name || 'Name not available'} {/* Use actual name from local storage if needed */}
                    </Typography>
                    <Typography variant="body1" color="initial">
                        Email: {email || 'Email not available'} {/* Display the email from state */}
                    </Typography>
                    <Typography variant="body1" color="initial">
                        Phone: {phone || 'Phone not available'}
                    </Typography>
                </Stack>
                <Button href="/newlisting" sx={{ borderRadius: 50, width: "fit-content" }} startIcon={<AddIcon />}>
                    Create New Listing
                </Button>
                <ProfileListings />
            </div>
        </Box>
    );
};

export default ProfilePage;
