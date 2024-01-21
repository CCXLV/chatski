import { userPresenceType } from "./types/types";

export const getUserPresenceStyle = (userPresence: userPresenceType[] | null, friend_id: string): React.CSSProperties => {
    const matchingUser = userPresence?.find(user => user.friend_id === friend_id);

    if (matchingUser) {
        return {
            backgroundColor: matchingUser.status === 'online' ? '#32B1AD' : 'gray',
        };
    }

    return {
        backgroundColor: 'gray',
    };
};