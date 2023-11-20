'use client'

import React, { useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { CommentProps } from '@/types/commentProps';

export default function AddComment ({ commentsList, setCommentsList, numOfComments, setNumOfComments }) {
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

    const handleCommentClick = () => {

        const newComment = {
            comment_text : comment,
            user_id : userid,
            listing_id : 66 // TODO: get from cookie
        }
        
        fetch('../../api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data
            // Update the state with the new comment
            // You can refactor the logic below to update your state based on the response
        })
        .catch(error => {
            // Handle any errors here
            console.error('There was a problem with the fetch operation:', error);
        });

        // const newComment = {
        //     id: "" + Math.random(),
        //     username: "my_username",
        //     comment: comment,
        //     time: "Just now",
        //     replies: [],
        // }
        // setCommentsList([newComment, ...commentsList]);

        setNumOfComments(numOfComments + 1);
        setComment('');
        setDisabled(true);
        setButtonsVisible("none");
    }

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

