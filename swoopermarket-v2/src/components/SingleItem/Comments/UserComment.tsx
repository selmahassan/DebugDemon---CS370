import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';

export default function UserComment({ key, username, comment, numOfLikes, time }: { key: string, username: string, comment: string, numOfLikes: number, time: string }) {
    const [isLiked, setIsLiked] = useState(false);
    const [emptyButtonVisable, setEmptyButtonVisible] = useState("");
    const [filledButtonVisable, setFilledButtonVisible] = useState("none");
    const [countLikes, setCountLikes] = useState(numOfLikes);

    const displayDeleteButton = username == "my_username" ? "" : "none";

    const handleLike = () => { // TODO : consider chopping?
        if(!isLiked) {
            setCountLikes(countLikes + 1);
            setIsLiked(true);
            setEmptyButtonVisible("none");
            setFilledButtonVisible("");
        } else {
            setCountLikes(countLikes - 1);
            setIsLiked(false);
            setEmptyButtonVisible("");
            setFilledButtonVisible("none");
        }
    }

    // TODO: write function
    const handleDelete = () => {
        // grab user_id, listing_id, and created_at timestamp. Delete the comment in comments db that matches all those fields
    }

    // TODO: write function
    const handleReply = () => {
        // append the op's handle and calls on post new comment again
    }
    
    return (
        <Stack id={key} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: '100%' }}>
            <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
            <Stack direction="column" sx={{ width: '50%' }}>
                <Stack direction="row" spacing={1}>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 'bold' }}>{`@${username}`}</Typography>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 'light', color: 'gray' }}>{time}</Typography>
                </Stack>
                <Typography variant="body1" color="initial">{comment}</Typography>
                <Stack direction="row" justifyContent="space-between" alignContent="center">
                    <Stack direction="row" alignItems="center">
                        <Button 
                            variant="text" 
                            sx={{borderRadius: 50, width: "fit-content"}}
                            onClick={handleReply}
                        >
                            Reply
                        </Button>
                        <Button
                            variant="text"
                            sx={{borderRadius: 50, width: "fit-content", color: "gray", display: displayDeleteButton}}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        <IconButton aria-label="empty-like" onClick={handleLike}>
                            <FavoriteBorderIcon sx={{ display: emptyButtonVisable}} />
                            <FavoriteIcon sx={{ display: filledButtonVisable, color:"red" }} />
                        </IconButton>
                        <Typography variant="body1" color="initial">{countLikes}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}