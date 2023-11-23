import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { CommentProps } from '@/types/commentProps';
import AddComment from './AddComment';
import DeleteModal from '@/components/DeleteModal';

const UserComment: React.FC<CommentProps> = ({ id, username, comment, time }) => {

    const displayDeleteButton = username == "my_username" ? "" : "none";

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const handleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    // // actually deleting comment
    // const handleDelete = () => {
    //     let count = 0;
    //     commentsList.forEach((comment) => {
    //         if(comment.id == id){
    //             comment.replies?.forEach((reply) => {
    //                 count++;
    //             })
    //         }
    //     });
    //     setNumOfComments(numOfComments - count - 1);

    //     // TODO: when updating to production code w/ database info, ensure that before you delete this parent comment, you must first iterate through all replies and delete each reply 
    //     const updatedCommentsList = commentsList.filter((item) => {
    //         return item.id != id
    //     });

    //     setCommentsList(updatedCommentsList);
    // }
    
    return (
        <Stack id={id} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: '100%' }}>
            <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
            <Stack direction="column">
                <Stack direction="row" spacing={1}>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 'bold' }}>{`@${username}`}</Typography>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 'light', color: 'gray' }}>{time}</Typography>
                </Stack>
                <Typography variant="body1" color="initial">{comment}</Typography>
                {/* <Stack direction="row" justifyContent="space-between" alignContent="center">
                    <Stack direction="row" alignItems="center">
                        <Button
                            variant="text"
                            sx={{borderRadius: 50, width: "fit-content", color: "gray", display: displayDeleteButton}}
                            onClick={handleDeleteModal}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack> */}
            </Stack>
            {/* {showDeleteModal &&
                <DeleteModal
                    handleDeleteModal={handleDeleteModal}
                    handleDelete={handleDelete}
                    deleteType="comment"
                />
            } */}
        </Stack>
    );
}

export default UserComment;