import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddComment from './Comments/AddComment';
import UserComment from './Comments/UserComment';

export interface Comment {
    id: string,
    username: string,
    comment: string,
    numOfLikes: number,
    time: string
}

const comments: Comment[] = [
    {
        id: "1",
        username: "Gru",
        comment: "I'm interested in buy this product. Would you be open to negotiating the price?",
        numOfLikes: 3,
        time: "2 days ago"
    },
    {
        id: "2",
        username: "Minion",
        comment: "im koaegg da key mas pan gru la ka pudum moo wed kos da stela ta reh",
        numOfLikes: 10,
        time: "2 days ago"
    }
]

export default function CommentSection() {
    const [commentsList, setCommentsList] = useState(comments);
    const [numOfComments, setNumOfComments] = useState(comments.length);

    return (
        <Stack direction="column" spacing={2} pt={3}>
            <Typography variant="h6" color="initial">{numOfComments} Comments</Typography>
            <AddComment
                commentsList={commentsList}
                setCommentsList={setCommentsList}
                numOfComments={numOfComments}
                setNumOfComments={setNumOfComments}
            />
            {commentsList.map((item) => (
                <UserComment
                    key={item.id}
                    username={item.username}
                    comment={item.comment}
                    numOfLikes={item.numOfLikes}
                    time={item.time}
                />
            ))}
        </Stack>
    );
}