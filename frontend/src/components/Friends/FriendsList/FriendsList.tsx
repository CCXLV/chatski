import React, { useEffect, useState } from "react";
import "../../../styles/Friends/FriendList/styles.css"

import { userFriendsType } from "../../../utils/types/types";
import { getFriendsList } from "../../../utils/functions/friends";
import { userPresenceType, userAccessType } from "../../../utils/types/types";
import { userChatSocket } from "../../../utils/functions/functions";

import { getUserPresenceStyle } from "../../../utils/utils";

import { socket } from "../../Home/Home";

interface FriendsProps {
    userPresence?: userPresenceType[] | null;
    userAccess?: userAccessType | null;
};

const FriendsList: React.FC<FriendsProps> = ({userPresence, userAccess}) => {
    const [userFriends, setUserFriends] = useState<userFriendsType[] | null>(null);


    useEffect(function() {
        if(userAccess?.access_token) {
            const friendsList = getFriendsList(userAccess.access_token);
            friendsList.then((res: any) => {
                setUserFriends(res.data);
            })
        }
    }, [])

    const sortedFriends = userFriends
        ? [...userFriends].sort((a, b) =>
            (a.user_username || a.friend_username).localeCompare(b.user_username || b.friend_username)
        )
        : [];

    const togleChat = (user_id: string, friend_id: string) => {
        userChatSocket(socket, user_id, friend_id); 
    };

    return (
        <div className='friends-l-div column'>
            {sortedFriends.map((friend, index) => (
                <button key={index} className='friend-div' onClick={() => togleChat(friend.user_id, friend.friend_id)}>
                    <div className='friend-icon' style={getUserPresenceStyle(userPresence || [], friend.friend_id)}></div>
                    <div className='friend-name-div'>
                        {friend.user_username ? friend.user_username : friend.friend_username}
                    </div>
                </button>
            ))}  
        </div>
    )
};

export default FriendsList;