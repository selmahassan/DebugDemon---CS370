'use client'

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddComment from './Comments/AddComment';
import UserComment from './Comments/UserComment';
import { Comment } from '@/types/comment';

function formatDate(isoDateString: string | number | Date) {
    const date = new Date(isoDateString);
    return date.toLocaleString(); 
}

export default function CommentSection({ comments, listingid, username }: {comments: Comment[] | null, listingid: string, username: string}) {   
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
                username={username}
            />
            {commentsList.map((item) => (
                <div key={item.comment_id}>
                    <UserComment
                        commentid={item.comment_id}
                        username={item.user_name}
                        userid = {item.user_id}
                        comment={item.comment_text}
                        time={formatDate(item.created_at)}
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