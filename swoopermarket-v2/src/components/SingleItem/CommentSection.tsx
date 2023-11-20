'use client'

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddComment from './Comments/AddComment';
import UserComment from './Comments/UserComment';
import { Comment } from '@/types/comment';

export default function CommentSection({ comments, listingid }: {comments: Comment[] | null, listingid: string}) {   
    if (comments === null) {
        return <>Error in Generating Comments</>
    }

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
                listingid={listingid}
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
                    />
                </div>
            ))}
        </Stack>
    );
}