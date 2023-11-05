'use client'

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddComment from './Comments/AddComment';
import UserComment from './Comments/UserComment';
import { Comment } from '@/types/comment';

const comments: Comment[] = [
    {
        id: "1",
        username: "Gru",
        comment: "I'm interested in buy this product. Would you be open to negotiating the price?",
        numOfLikes: 3,
        time: "2 days ago",
        replies: [
            {
                id: "reply1",
                username: "Agnes",
                comment: "@Gru i wuv u dad <3",
                numOfLikes: 342,
                time: "1 day ago"
            }
        ]
    },
    {
        id: "2",
        username: "Minion",
        comment: "im koaegg da key mas pan gru la ka pudum moo wed kos da stela ta reh",
        numOfLikes: 10,
        time: "2 days ago",
        replies: []
    }
]

const countComments = () => {
    let count = 0;
    comments.map((parentComment) => {
        parentComment.replies?.map(() => {
            count++;
        })
        count++;
    })

    return count;
}

export default function CommentSection() {
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
                <div key={item.id}>
                    <UserComment
                        id={item.id}
                        username={item.username}
                        comment={item.comment}
                        numOfLikes={item.numOfLikes}
                        time={item.time}
                        commentsList={commentsList}
                        setCommentsList={setCommentsList}
                        numOfComments={numOfComments}
                        setNumOfComments={setNumOfComments}
                        isReply={false}
                    />
                    {item.replies && item.replies.length > 0 && (
                        <div className="replies">
                            {item.replies.map((reply) => (
                                <UserComment
                                    key={reply.id}
                                    parentId={item.id}
                                    id={reply.id}
                                    username={reply.username}
                                    comment={reply.comment}
                                    numOfLikes={reply.numOfLikes}
                                    time={reply.time}
                                    commentsList={commentsList}
                                    setCommentsList={setCommentsList}           
                                    numOfComments={numOfComments}
                                    setNumOfComments={setNumOfComments}
                                    isReply={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </Stack>
    );
}