export type Message = {
    id: string;
    sender: string;
    receiver: string;
    text: string;
    timestamp: Date;
};

let messages: Message[] = [];

// Handlers for messages
export const getMessages = () => messages;

export const sendMessage = (message: { receiver: any; sender: any; text: any; timestamp: Date }) => {
    messages.push(message);
};

export const deleteMessage = (id: string) => {
    messages = messages.filter((message) => message.id !== id);
};

export const updateMessage = (id: string, text: string) => {
    const message = messages.find((message) => message.id === id);

    if (message) {
        message.text = text;
    } else {
        throw new Error("No such message found");
    }
};

export const getMessageByID = (id: string) => {
    return messages.find((message) => message.id === id);
};
