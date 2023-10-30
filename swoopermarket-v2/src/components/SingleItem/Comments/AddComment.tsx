import React, { useState} from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Comment } from '../CommentSection';

interface CommentProps {
    commentsList: Comment[],
    setCommentsList: React.Dispatch<React.SetStateAction<Comment[]>>,
    numOfComments: number,
    setNumOfComments: React.Dispatch<React.SetStateAction<number>>
}

const AddComment: React.FC<CommentProps> = ({ commentsList, setCommentsList, numOfComments, setNumOfComments }) => {
    const [comment, setComment] = useState('');
    const [buttonsVisable, setButtonsVisible] = useState("none");
    const [disabled, setDisabled] = useState(true);
    
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);

        if(event.target.value == ''){
            setDisabled(true);
        }else{
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

    const handleCommentClick = () => {
        const newComment = {
            id: "" + Math.random(),
            username: "my_username",
            comment: comment,
            numOfLikes: 0,
            time: "Just now"
        }
        setCommentsList([newComment, ...commentsList]);
        setNumOfComments(numOfComments + 1)
        setComment('');
        setDisabled(true);
        setButtonsVisible("none");
    }

    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: '100%' }}>
            <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
            <Stack direction="column" spacing={1} sx={{ width: '50%' }}>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <TextField
                        id="add-comment"
                        name="comment"
                        label=""
                        placeholder="Add comment..."
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

export default AddComment;