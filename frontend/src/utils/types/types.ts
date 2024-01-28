export interface userDataType {
    user_id?: string;
    username?: string;
    email?: string;
};

export interface friendRequestData {
    [key: string] : {
        id: number;
        user_id: string;
        req_user_id: string;
        req_user_username: string;
    }
};

export interface friendRequestDataType {
    id: number;
    user_id: string;
    req_user_id: string;
    req_user_username: string;
};

export interface userPresenceType {
    user_id: string;
    friend_id: string;
    status: string;
};

export interface userFriendsType { 
    user_id: string;
    friend_id: string;
    user_username: string;
    friend_username: string;
};

export interface userAccessType {
    access_token?: string;
    user_id?: string;
    username?: string;
    refresh_token?: string;
};

export interface ChatInfoType {
    friend_id: string;
};

export interface displayUserChatType {
    user_id: string;
    friend_id: string;
};

export interface friendDataType {
    user_id: string;
    username: string;
};

export interface chatMessageType {
    author_id: string;
    author_username: string;
    friend_id: string;
    message_id: number;
    message: string;
    date: string;
};
