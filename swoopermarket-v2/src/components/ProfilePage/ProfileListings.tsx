'use client'

import { Button, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { ItemType } from "@/types/itemType";
import AddIcon from '@mui/icons-material/Add';
import { User } from '@/types/userType';
import { useState, useEffect } from "react";

export default function ProfileListings({listings, user_info} : {listings: Array<any>, user_info: User}) {
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

        if (user === String(user_info.userid)) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        console.log("user: " + user)
        console.log("userid: " + String(user_info.userid))
    }, []);
    
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Typography sx={{ color: "#0033a0", padding: "5px 0px" }}>
                    Results ({listings.length})
                </Typography>
                {
                    loggedIn ?
                    <Button href="/newlisting" sx={{ borderRadius: 25, width: "fit-content" }} startIcon={<AddIcon />}>
                        Create New Listing
                    </Button> : <></>
                }
            </Stack>  
            <Grid id="personal listings" alignItems="center" container rowSpacing={3} columnSpacing={3} >
                {listings.map((item: ItemType) => (
                    <Grid key={item.listing_id} xs={12} sm={4} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
            </Grid>
            
        </>
    );
}