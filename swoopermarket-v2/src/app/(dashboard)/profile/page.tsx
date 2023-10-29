import * as React from 'react';
import Typography from '@mui/material/Typography';
import Header from '@/components/Header';
import Stack from '@mui/material/Stack';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import ProfileListings from "@/components/ProfilePage/ProfileListings";
import Box from '@mui/material/Box';

export default function ProfilePage() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <div>
                {/* <Header /> */}
                {/* <Stack direction="row" sx={{ pl: 2, pr: 2 }} justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Button href="/" sx={{ borderRadius: 50, width: "fit-content" }} startIcon={<ArrowBack />}>
                        Back to listings
                    </Button>
                </Stack> */}
                <Stack direction="column" spacing={1} alignItems="center">
                    <Avatar alt="Profile Picture" src="/images/avatar/gru.jpg" sx={{ width: 200, height: 200 }} />
                    <Rating name="read-only" defaultValue={1.5} precision={0.5} readOnly />
                    <Typography variant="h4" color="initial">
                        Gru
                    </Typography>
                    <Typography variant="body1" color="initial">
                        Email: iWantToStealTheMoon@minions.com
                    </Typography>
                </Stack>
                <ProfileListings />
            </div>
        </Box>
    );
}
