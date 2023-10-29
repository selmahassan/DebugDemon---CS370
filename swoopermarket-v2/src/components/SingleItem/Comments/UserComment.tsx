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

    const handleLike = () => {
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
                    <Button variant="text" sx={{borderRadius: 50, width: "fit-content"}}>Reply</Button>
                    <Stack direction="row" spacing={.5} justifyContent="flex-end" alignItems="center">
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