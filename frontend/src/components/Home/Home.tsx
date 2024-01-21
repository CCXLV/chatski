import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../utils/service/AuthService';

import { getFriendRequests } from '../../utils/functions/functions';

import { redirect } from '../../utils/functions/auth';
import { userDataType, friendRequestDataType, userPresenceType } from '../../utils/types/types';

import NavBar from '../NavBar/NavBar';
import Friends from '../Friends/Friends';
import Chat from '../Chat/Chat';

import axios, { AxiosResponse } from 'axios';
import "../../styles/styles.css";

import io from "socket.io-client";

export const socket = io('http://127.0.0.1:5000');

const Home: React.FC = () => {
    const [userData, setUserData] = useState<userDataType | null>(null);
    const [friendRequest, setFriendRequest] = useState<friendRequestDataType[] | null>(null);
    const [userPresence, setUserPresence] = useState<userPresenceType[] | null>(null);
   
    const user = getCurrentUser();

    useEffect(function() {
        const friendRequests = getFriendRequests(user?.access_token) || null;

        axios.get("http://127.0.0.1:5000/api/user", {
            headers: {
                "Authorization": `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            setUserData(res.data)
        })
        friendRequests.then((response: AxiosResponse<any, any>) => {
            setFriendRequest(response.data)
        })
    }, [])

    
    useEffect(function() {
        const user = getCurrentUser();
        const handleBeforeUnload = () => {
            socket.emit('user_left', {user_id: user?.user_id});
        };

        if (user) {
            socket.emit("user_logged", {user_id: user.user_id})
            socket.on("friends_status", (data: userPresenceType[]) => {
                setUserPresence(data);
            })
            socket.on('friend_request_data', (data: friendRequestDataType[]) => {
                setFriendRequest(data)
            })
          
            window.addEventListener('beforeunload', handleBeforeUnload);
        }
    }, [])

    if (!user) {
        return redirect("/login")
    }
    
    return (
       <div>
            <div className='container-main column'>
                <NavBar user_id={userData?.user_id} username={userData?.username} email={userData?.email}/>
                <div className='main-content'>
                    <Friends userAccess={user} userData={userData} userPresence={userPresence} friendRequest={friendRequest}/>
                    <Chat userAccess={user} userPresence={userPresence}/>
                </div>
            </div>
       </div>
    );
};

export default Home;