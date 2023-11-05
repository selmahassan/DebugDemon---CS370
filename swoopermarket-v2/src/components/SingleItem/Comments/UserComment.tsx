import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CommentProps } from '@/types/commentProps';
import AddComment from './AddComment';

const UserComment: React.FC<CommentProps> = ({ isReply, parentId, id, username, comment, numOfLikes, time, commentsList, setCommentsList, numOfComments, setNumOfComments }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [emptyButtonVisable, setEmptyButtonVisible] = useState("");
    const [filledButtonVisable, setFilledButtonVisible] = useState("none");
    const [countLikes, setCountLikes] = useState(numOfLikes ? numOfLikes : 0);

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

    const displayDeleteButton = username == "my_username" ? "" : "none";

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const handleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    // actually deleting comment
    const handleDelete = () => {
        setNumOfComments(numOfComments - 1);

        if(isReply){
            // find the parent comment from commentsList
            let updatedCommentsList = commentsList.map((comment) => {
                if (comment.id === parentId) {
                    // update the replies array of the parent comment
                    const updatedReplies = comment.replies?.filter((reply) => reply.id !== id) || [];
                    return { ...comment, replies: updatedReplies };
                }
                return comment;
            });

            setCommentsList(updatedCommentsList);
        } else {
            // TODO: when updating to production code w/ database info, ensure that before you delete this parent comment, you must first iterate through all replies and delete each reply 
            let updatedCommentsList = commentsList.filter((item) => {
                return item.id != id
            });
    
            setCommentsList(updatedCommentsList);
        }
    }

    const [showReplyField, setShowReplyField] = useState(false);

    const handleReply = () => {
        setShowReplyField(true);
    }
    
    return (
        <Stack id={id} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: '100%' }} paddingLeft={isReply ? 5 : 0}>
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
                            onClick={handleDeleteModal}
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
                {showReplyField && 
                    <AddComment
                        parentId={parentId}
                        repliedId={id}
                        commentsList={commentsList}
                        setCommentsList={setCommentsList}
                        numOfComments={numOfComments}
                        setNumOfComments={setNumOfComments}
                        setShowReplyField={setShowReplyField}
                        isReplyField={true}
                        isReply={isReply}
                    />
                }
            </Stack>
            {showDeleteModal && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 3, backgroundColor: "white", borderRadius: 5 }}>
                    <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                        <Typography variant="body1" color="black" sx={{ fontWeight: 'medium' }}>Delete comment</Typography>
                        <Typography variant="body1" color="gray">Delete your comment permanently?</Typography>
                        <Stack direction="row" spacing={3}>
                            <Button onClick={handleDeleteModal} sx={{borderRadius: 50, width: "fit-content"}}>Cancel</Button>
                            <Button onClick={handleDelete} sx={{borderRadius: 50, width: "fit-content"}}>Delete</Button>
                        </Stack>
                    </Stack>
                </Box>
            </div>
          )}
        </Stack>
    );
}

export default UserComment;