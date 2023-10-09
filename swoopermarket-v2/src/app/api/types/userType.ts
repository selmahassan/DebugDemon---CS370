export type User = {
    userid: string,
    name: string,
    image: string,
    username: string
};

let users: User[] = [];

//handlers
export const getUsers = () => users;

export const postUser = (user: User) => {
    users.push(user)
};

export const deleteUser = (id: string) => {
    users = users.filter((user) => user.userid !== id);
};

export const updateUser = (userid: string, name: string, image: string, username: string) => {
    const user = users.find((user) => user.userid === userid);

    if(user){
        user.name = name;
        user.image = image;
        user.username = username;
    } else {
        throw new Error("No such user found");
    }
};

export const getByID = (id: string) => {
    return users.find((user) => user.userid === id);
};

