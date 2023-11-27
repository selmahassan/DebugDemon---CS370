import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CommentProps } from '@/types/commentProps';
import DeleteModal from '@/components/DeleteModal';

const UserComment: React.FC<CommentProps> = ({ commentid, username, userid, comment, time, commentsList, setCommentsList, numOfComments, setNumOfComments }) => {
    
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const handleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const [loggedInUserId, setloggedInUserId] = useState('');

    useEffect(() => {
        // Retrieve user info from local storage
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setloggedInUserId(user.userid);
        }
    }, []);

    // Determine if the logged-in user is the one who posted this comment
    const isUserComment = loggedInUserId === userid;
    const displayDeleteButton = loggedInUserId === userid ? "" : "none";

    // Delete comment in database
    const handleDelete = async () => {
    
        if (isUserComment) {

            const deleteComment = {
                comment_id: commentid,
                user_id: userid,
            };

            try {
                console.log("try fetch reached");

                const response = await fetch('../../api/comments', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deleteComment)
                });
            } catch (error) {            
                console.error('Error:', error);
            }

            const updatedCommentsList = commentsList.filter((commentItem) => commentItem.comment_id !== commentid);
            setCommentsList(updatedCommentsList);
            setNumOfComments(numOfComments - 1);
        }
    };
    
    return (
        <Stack id={commentid} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: '100%' }}>
            <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
            <Stack direction="column">
                <Stack direction="row" spacing={1}>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 'bold' }}>{`@${username}`}</Typography>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 'light', color: 'gray' }}>{time}</Typography>
                </Stack>
                <Typography variant="body1" color="initial">{comment}</Typography>
                {<Stack direction="row" justifyContent="space-between" alignContent="center">
                    <Stack direction="row" alignItems="center">
                        <Button
                            variant="text"
                            sx={{borderRadius: 50, width: "fit-content", color: "gray", display: displayDeleteButton}}
                            onClick={handleDeleteModal}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>}
            </Stack>
            {showDeleteModal &&
                <DeleteModal
                    handleDeleteModal={handleDeleteModal}
                    handleDelete={handleDelete}
                    deleteType="comment"
                />
            }
        </Stack>
    );
}

export default UserComment;