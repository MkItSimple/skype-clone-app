export type SelectedChatUser = {
    _id: string, 
    firstname: string, 
    lastname: string,
    email: string,
    avatarImage: {
        public_id: string
        url: string
    },
    status: string
}

export type User = {
    _id : string,
    firstname: string,
    lastname: string,
    email: string,
    avatarImage: {
        public_id: string
        url: string
    },
    status: string,
    token: string,
}

export type Contact = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatarImage: string;
    status: string;
}

export type AvatarUser = {
    _id : string,
    firstname: string,
    lastname: string,
    email: string,
    avatarImage: {
        public_id: string
        url: string
    }
    status: string,
}

export type Chat = {
    _id: string,
    chatName: string,
    isGroupChat: boolean,
    groupAdmin: {
        firstname: string,
        lastname: string,
        avatarImage: string
    },
}

export type GroupAdmin = {
    _id: string,
    firstname: string,
    lastname: string,
    avatarImage: string
}

export const MESSAGE_TYPE = {
    TXT: "TXT",
    IMAGE: "IMAGE",
    EMOJI: "EMOJI",
}

export const AVATAR = {
    AVATAR_BIG: { height: "202px", width: "200px" },
    AVATAR_MEDIUM: { height: "50px", width: "50px" },
    AVATAR_SMALL: { height: "22px", width: "20px" },
}

export const STATUS = {
    ACTIVE: 'Active',
    DO_NOT_DISTURB: 'Do not disturb',
    AWAY: 'Away',
    INVISIBLE: 'Invisible',
}

export const ICON = {
    BOLD: "bold",
    ITALIC: "italic",
    UNDERLINE: "underline",
}

export type UnreadMessage = {
    _id : string,
    content : string,
    chat : string
}