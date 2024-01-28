import React, { useEffect, useState } from "react";

import { userAccessType, displayUserChatType, userPresenceType, friendDataType, chatMessageType } from "../../utils/types/types";
import { 
    getChatData, 
    getChatMessages, 
    handleMessageInput, 
    handleMessageKeyDown, 
    handleMessageFormSubmit, 
    fixElementsScroll,
    convertDate } from "../../utils/functions/functions";

import { getUserPresenceStyle } from "../../utils/utils";

import { socket } from "../Home/Home";

import "../../styles/Chat/styles.css";

interface ChatType {
    userAccess?: userAccessType | null;
    userPresence?: userPresenceType[] | null;
}

const Chat: React.FC<ChatType> = ({
    userAccess, userPresence
}) => {
    const [showChat, setShowChat] = useState<boolean | null>(null);
    const [chatFriendId, setChatFriendId] = useState<string | null>(null);
    const [friendData, setFriendData] = useState<friendDataType | null>(null)
    const [chatMessages, setchatMessages] = useState<chatMessageType[] | null>(null);

    useEffect(() => {
        const chatTogleSocket = (data: displayUserChatType) => {
            if (data.user_id === userAccess?.user_id) {
                if (chatFriendId === data.friend_id) {
                    setChatFriendId('');
                    setShowChat(false);
                } else {
                    setChatFriendId(data.friend_id);
                    setShowChat(true);
                }
            }
        };
        socket.on("chat_togle", chatTogleSocket)

        return () => {
            socket.off("chat_togle", chatTogleSocket);
        };
        
    }, [chatFriendId, userAccess])

    useEffect(() => {
        if (chatFriendId) {
            getChatData(userAccess?.access_token || '', chatFriendId)
            .then((res: any) => {
                setFriendData(res.data)
            });
            getChatMessages(userAccess?.access_token || '', chatFriendId)
            .then((res: any) => {
                setchatMessages(res.data);
            })
        }

    }, [chatFriendId, userAccess])

    useEffect(function() {
        socket.on("recieve_message", (data: any) => {
            setchatMessages(prevMessages => [...(prevMessages || []), data]);
            setTimeout(function() {
                const chatDiv = document.querySelector(".chat-main-div") as HTMLElement;
                fixElementsScroll(chatDiv);
            }, 100)
        })
    }, [])


    const sortedMessages = chatMessages
        ? [...chatMessages].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return dateA - dateB;
        })
        : [];


    return (
        <div className="chat-main column">
            {userAccess && showChat && friendData && chatMessages ? (
                <div className="chat-inner">
                    <div className="chat-upper-main column">
                        <div className="chat-info-div inner-padding">
                            <div className='friend-icon' style={getUserPresenceStyle(userPresence || [], chatFriendId || '')}></div>
                            <div className='friend-name-div'>{friendData.username}</div> 
                        </div>
                        <div className="chat-main-div inner-padding">
                            {sortedMessages.map((message, index) => (
                                <div key={index} className={message.author_id === chatFriendId ? 'message-text-d friend-messages' : 'message-text-d user-messages'}>
                                    <div className="message-author-icon-div">
                                        <div className="message-author-icon">{message.author_username.charAt(0).toUpperCase()}</div>
                                    </div>
                                    <div className="message-inner-div column">
                                        <div className="message-info">
                                            <span className="message-author-username-sp">{message.author_username}</span>
                                            <span className="message-date-sp">{convertDate(message.date)}</span>
                                        </div>
                                        <div className="message-body">{message.message}</div>
                                    </div>
                                    {/* {message.author_id === chatFriendId && (
                                        <div className="message-delete-button">
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 11V17" stroke="aliceblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14 11V17" stroke="aliceblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4 7H20" stroke="aliceblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="alicebluw" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="aliceblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    )} */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chat-lower-main inner-padding-2">
                        <form className="message-form" onSubmit={(event) => handleMessageFormSubmit(event, userAccess.user_id || '', userAccess.username || '', friendData.user_id, userAccess.access_token || '')}>
                            <div className="input-div border-radius-4">
                                <div className="file-upload-div">
                                    <div className="file-upload-btn">
                                        <svg fill="aliceblue" width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-e</title><path d="M450.29,112H142c-34,0-62,27.51-62,61.33V418.67C80,452.49,108,480,142,480H450c34,0,62-26.18,62-60V173.33C512,139.51,484.32,112,450.29,112Zm-77.15,61.34a46,46,0,1,1-46.28,46A46.19,46.19,0,0,1,373.14,173.33Zm-231.55,276c-17,0-29.86-13.75-29.86-30.66V353.85l90.46-80.79a46.54,46.54,0,0,1,63.44,1.83L328.27,337l-113,112.33ZM480,418.67a30.67,30.67,0,0,1-30.71,30.66H259L376.08,333a46.24,46.24,0,0,1,59.44-.16L480,370.59Z"/><path d="M384,32H64A64,64,0,0,0,0,96V352a64.11,64.11,0,0,0,48,62V152a72,72,0,0,1,72-72H446A64.11,64.11,0,0,0,384,32Z"/></svg>
                                    </div> 
                                    <input type="file" aria-hidden="true" className="image-upload-inp"/>
                                </div>
                                <div className="message-div">
                                    <textarea 
                                        className="message-input" 
                                        autoFocus tabIndex={0} 
                                        placeholder={`Message ${friendData.username}`} 
                                        rows={1} 
                                        onChange={handleMessageInput}
                                        onKeyDown={(event) => handleMessageKeyDown(event, userAccess.user_id || '', userAccess.username || '', friendData.user_id, userAccess.access_token || '')}
                                    />
                                </div>
                                <div className="send-div">
                                    <button className="msg-send-button disabled">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="no-chats">Start chat with a friend</div>
            )}
        </div>  
    )
};

export default Chat;