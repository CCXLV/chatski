import React, { useState } from "react";

import { userPresenceType, userAccessType, userDataType, friendRequestDataType } from "../../utils/types/types";

import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsList from "./FriendsList/FriendsList";


interface FriendsProps {
    userPresence?: userPresenceType[] | null;
    userData?: userDataType | null;
    friendRequest?: friendRequestDataType[] | null;
    userAccess?: userAccessType | null;
};

const Friends: React.FC<FriendsProps> = ({
    userAccess, userData, userPresence, friendRequest
}) => {
    const [showFriendList, setShowFriendList] = useState(false);

    function toggleFriendList() {
        setShowFriendList(!showFriendList);
    };

    return (
        <div className='friends-main column'>
            <FriendsHeader 
                showFriendList={showFriendList} 
                toggleFriendList={toggleFriendList} 
                userAccess={userAccess} 
                userData={userData} 
                friendRequest={friendRequest}
            />
            {showFriendList && <FriendsList userAccess={userAccess} userPresence={userPresence} />}
        </div>
    )
};

export default Friends;