import { Comment } from "./comment"

export type CommentProps = {
    isReply: boolean,
    isReplyField?: boolean,
    parentId?: string,
    repliedId?: string,
    id?: string,
    username?: string,
    comment?: string,
    numOfLikes?: number,
    time?: string
    commentsList: Comment[],
    setCommentsList: React.Dispatch<React.SetStateAction<Comment[]>>,
    numOfComments: number,
    setNumOfComments: React.Dispatch<React.SetStateAction<number>>,
    setShowReplyField?: React.Dispatch<React.SetStateAction<boolean>>
}