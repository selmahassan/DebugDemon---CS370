'use client'

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddComment from './Comments/AddComment';
import UserComment from './Comments/UserComment';
import { Comment } from '@/types/comment';

export default async function CommentSection({ comments }: {comments: Comment[] | null}) {   
    if (comments === null) {
        return <>Comments Here</>
    }

    const countComments = () => {
        let count = 0;
        comments.map((parentComment) => {
            count++;
        })
    
        return count;
    }

    const [commentsList, setCommentsList] = useState(comments);
    const [numOfComments, setNumOfComments] = useState(countComments);

    return (
        <Stack direction="column" spacing={2} pt={3}>
            <Typography variant="h6" color="initial">{numOfComments} Comments</Typography>
            <AddComment
                parentId={""}
                commentsList={commentsList}
                setCommentsList={setCommentsList}
                numOfComments={numOfComments}
                setNumOfComments={setNumOfComments}
                isReply={false}
            />
            {commentsList.map((item) => (
                <div key={item.comment_id}>
                    <UserComment
                        id={item.comment_id}
                        username={item.user_id}
                        comment={item.comment_text}
                        time={item.created_at}
                        commentsList={commentsList}
                        setCommentsList={setCommentsList}
                        numOfComments={numOfComments}
                        setNumOfComments={setNumOfComments}
                        isReply={false}
                    />
                </div>
            ))}
        </Stack>
    );
}