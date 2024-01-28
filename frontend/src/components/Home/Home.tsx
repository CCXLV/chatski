import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../../utils/service/AuthService';

import { getFriendRequests, getUserData, checkAccessTokenExistance } from '../../utils/functions/functions';

import { redirect } from '../../utils/functions/auth';
import { userDataType, friendRequestDataType, userPresenceType,userAccessType } from '../../utils/types/types';

import NavBar from '../NavBar/NavBar';
import Friends from '../Friends/Friends';
import Chat from '../Chat/Chat';

import "../../styles/styles.css";

import io from "socket.io-client";

export const socket = io('http://127.0.0.1:5000');

const Home: React.FC = () => {
    const [userData, setUserData] = useState<userDataType | null>(null);
    const [userAccessData, setUserAccessData] = useState<userAccessType | null>(null);
    const [friendRequest, setFriendRequest] = useState<friendRequestDataType[] | null>(null);
    const [userPresence, setUserPresence] = useState<userPresenceType[] | null>(null);
   

    useEffect(function() {
        const user = getCurrentUser();

        if (user && user.access_token && user.refresh_token) {
            checkAccessTokenExistance(user.access_token, user.refresh_token).then((res) => {
                if (res.access_token) {
                    updateCurrentUser(res.access_token);
                    const updatedUser = getCurrentUser(); 
                    setUserAccessData(updatedUser);
                } else if (res === 200) {
                    setUserAccessData(user);
                } else {
                    setUserAccessData(null);
                }
            }).catch(() => {
                setUserAccessData(null);
            });
        } else {
            setUserAccessData(null);
        }
    }, []);

    useEffect(function() {
        const user = getCurrentUser();
        if (!user) {
            redirect("/login");
        }
    }, []);

    useEffect(function() {
        if (userAccessData) {
            const userDataA = getUserData(userAccessData.access_token || '') || null;
            userDataA.then((res: any) => {
                setUserData(res.data)
            })
            const friendRequests = getFriendRequests(userAccessData.access_token || '') || null;
            friendRequests.then((res: any) => {
                setFriendRequest(res.data);
            })
        }
    }, [userAccessData])

    
    useEffect(function() {
        if (userAccessData) {
            const handleBeforeUnload = () => {
                socket.emit('user_left', {user_id: userAccessData.user_id});
            };

            socket.emit("user_logged", {user_id: userAccessData.user_id})
            socket.on("friends_status", (data: userPresenceType[]) => {
                setUserPresence(data);
            })
            socket.on('friend_request_data', (data: friendRequestDataType[]) => {
                setFriendRequest(data)
            })
          
            window.addEventListener('beforeunload', handleBeforeUnload);
        }
    }, [userAccessData])


    return (
       <div>
            <div className='container-main column'>
                <NavBar user_id={userData?.user_id} username={userData?.username} email={userData?.email}/>
                <div className='main-content'>
                    <Friends userAccess={userAccessData} userData={userData} userPresence={userPresence} friendRequest={friendRequest}/>
                    <Chat userAccess={userAccessData} userPresence={userPresence}/>
                </div>
            </div>
       </div>
    );
};

export default Home;