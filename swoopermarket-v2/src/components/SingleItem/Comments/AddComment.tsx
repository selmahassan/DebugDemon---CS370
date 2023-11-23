'use client'

import React, { useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { CommentProps } from '@/types/commentProps';

export default function AddComment ({ commentsList, setCommentsList, numOfComments, setNumOfComments, listingid, username} : { commentsList: any, setCommentsList: any, numOfComments: number, setNumOfComments: any, listingid: string, username: string}) {
    const [comment, setComment] = useState('');
    const [buttonsVisable, setButtonsVisible] = useState("none");
    const [disabled, setDisabled] = useState(true);
    
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);

        if(event.target.value == ''){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const handleFormClick = () => {
        setButtonsVisible("");
    }

    const handleCancelClick = () => {
        setButtonsVisible("none");
        setComment('');
    }
    
    const [userid, setUserid] = useState('');

    useEffect(() => {
        // Retrieve user info from local storage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setUserid(user.userid);
        }
    }, []);

    const handleCommentClick = async () => {
        const newComment = {
            comment_text: comment,
            user_id: userid,
            listing_id: listingid,
        };
    
        // Post the comment to the server
        try {
            const response = await fetch('../../api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });
    
            if (response.ok) {
                const responseData = await response.json();
                const addedComment = responseData.messages.rows[0];

                setCommentsList([addedComment, ...commentsList]);
                setNumOfComments(numOfComments + 1);
            } else {
                console.error('Error updating comments list:', response.statusText);
            }
        } catch (error) {            
            console.error('Error:', error);
        }
    
        setComment('');
        setDisabled(true);
        setButtonsVisible("none");
    };

    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: '100%' }} paddingLeft={0} >
            <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
            <Stack direction="column" spacing={1} sx={{ width: '50%' }}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <TextField
                        id="add-comment"
                        name="comment"
                        label=""
                        placeholder={"Add comment..."}
                        value={comment}
                        multiline
                        maxRows={4}
                        variant="standard"
                        size="small"
                        onClick={handleFormClick}
                        onChange={handleFormChange}
                    />
                </FormControl>
                <Stack direction="row" sx={{ display: buttonsVisable}} spacing={1} justifyContent="flex-end">
                    <Button
                        variant="text"
                        sx={{borderRadius: 50, width: "fit-content"}}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained" 
                        sx={{borderRadius: 50, width: "fit-content"}} 
                        disabled={disabled}
                        onClick={handleCommentClick}
                    >
                        Comment
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

function setErrorMessage(arg0: string) {
    throw new Error('Function not implemented.');
}
function setOpenError(arg0: boolean) {
    throw new Error('Function not implemented.');
}

