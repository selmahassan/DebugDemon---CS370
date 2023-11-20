import React, { useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { CommentProps } from '@/types/commentProps';
import { redirect } from 'next/navigation';

const AddComment: React.FC<CommentProps> = ({ isReplyField, isReply, parentId, repliedId, commentsList, setCommentsList, numOfComments, setNumOfComments, setShowReplyField }) => {
    const [comment, setComment] = useState('');
    const [buttonsVisable, setButtonsVisible] = useState("none");
    const [disabled, setDisabled] = useState(true);
    const [replyToUsername, setReplyToUsername] = useState("");
    
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

        let parentUsername = ""
        if(isReply){ // if comment user is replying to is also a reply
            const parentComment = commentsList.find((comment) => comment.id === parentId);
            if (parentComment) {
                const reply = parentComment.replies?.find((reply) => reply.id === repliedId);
                if (reply) {
                    parentUsername = reply.username;
                }
            }
        } else { // if comment user is replying to is a parent comment, don't @ parent username
            const parentComment = commentsList.find((comment) => comment.id === repliedId);
            if (parentComment) {
                parentUsername = parentComment.username;
            }
        }
        
        setReplyToUsername(parentUsername)
    }

    const handleCancelClick = () => {
        setButtonsVisible("none");
        setComment('');
        if(setShowReplyField) setShowReplyField(false);
    }

    const handleReplyCancelClick = () => {
        if(setShowReplyField) setShowReplyField(false);
    }
    
    // const [userid, setUserid] = useState('');

    // useEffect(() => {
    //     // Retrieve user info from local storage
    //     const userInfo = localStorage.getItem('userInfo');
    //     let cookie_userid = "0"
    //     if (userInfo) {
    //         const user = JSON.parse(userInfo);
    //         cookie_userid = user.userid;
    //         setUserid(user.userid);
    //     }
    //     if (cookie_userid === "0") {
    //       redirect(`/login`)
    //     }
    // }, []);

    const handleCommentClick = () => {

        // if (!userid) {
        //     setErrorMessage('No user id found, please log in again');
        //     setOpenError(true);
        //     return;
        // }

        const newComment = {
            comment_text : comment,
            user_id : 1,
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

        if(isReplyField){ // add reply comment
            const newReplyComment = {
                id: "" + Math.random(),
                username: "my_username",
                comment: `@${replyToUsername} ${newComment}`,
                numOfLikes: 0,
                time: "Just now",
            }

            // find parent comment from commentsList to append reply to
            let updatedCommentsList = commentsList.map((comment) => {
                // if comment user is replying to is also a reply --> use parentId
                if(isReply && comment.id === parentId) { 
                    // update replies array of parent comment
                    const updatedReplies = comment.replies ? [...comment.replies, newReplyComment] : [newReplyComment];
                    return { ...comment, replies: updatedReplies };
                // if comment user is replying to is a parent comment --> use repliedId
                } else if (!isReply && comment.id === repliedId) {
                    // update replies array of parent comment
                    const updatedReplies = comment.replies ? [...comment.replies, newReplyComment] : [newReplyComment];
                    return { ...comment, replies: updatedReplies };
                }
                return comment;
            });

            setCommentsList(updatedCommentsList);
        } else { // add new parent comment
            const newComment = {
                id: "" + Math.random(),
                username: "my_username",
                comment: comment,
                numOfLikes: 0,
                time: "Just now",
                replies: [],
            }
            setCommentsList([newComment, ...commentsList]);
        }

        if(setShowReplyField) setShowReplyField(false);
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
                        placeholder={isReplyField ? "Add reply..." : "Add comment..."}
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
                        onClick={isReplyField ? handleReplyCancelClick : handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained" 
                        sx={{borderRadius: 50, width: "fit-content"}} 
                        disabled={disabled}
                        onClick={handleCommentClick}
                    >
                        {isReplyField ? "Reply" : "Comment"}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default AddComment;

function setErrorMessage(arg0: string) {
    throw new Error('Function not implemented.');
}
function setOpenError(arg0: boolean) {
    throw new Error('Function not implemented.');
}

