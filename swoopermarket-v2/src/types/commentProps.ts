import { Comment } from "./comment"

export type CommentProps = {
    id?: string,
    username?: string,
    comment?: string,
    numOfLikes?: number,
    time?: string
    commentsList: Comment[],
    setCommentsList: React.Dispatch<React.SetStateAction<Comment[]>>,
    numOfComments: number,
    setNumOfComments: React.Dispatch<React.SetStateAction<number>>
}