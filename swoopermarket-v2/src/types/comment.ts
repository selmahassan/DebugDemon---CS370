export interface Comment {
    parentId?: string, // comment only has this if reply comment
    id: string,
    username: string,
    comment: string,
    numOfLikes: number,
    time: string,
    replies?: Comment[] // comment only has this if parent comment
}