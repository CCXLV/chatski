import axios from 'axios';

const API_URL = "http://127.0.0.1:5000/api";


let dropMenuButtonState = false;
export function dropdownMenu(event: React.FormEvent<HTMLButtonElement>) {
    const button = event.currentTarget as HTMLElement;
    const buttonIcon = button.querySelector(".dropdown-icon") as HTMLElement;
    const profileInfo = button.parentElement?.parentElement?.querySelector(".profile-info") as HTMLElement;

    if (!dropMenuButtonState) {
        buttonIcon.style.transform = "rotate(0deg) scale(0)";
        profileInfo.classList.toggle("active");
        dropMenuButtonState = true;
        buttonIcon.style.transform = "rotate(0deg) scale(1)";
    } else {
        buttonIcon.style.transform = "rotate(180deg) scale(0)";
        profileInfo.classList.toggle("active");
        dropMenuButtonState = false;
        buttonIcon.style.transform = "rotate(180deg) scale(1)";
    }
    document.addEventListener("click", function(event) {
        if (!profileInfo.contains(event.target as Node | null) && !button.contains(event.target as Node | null) && dropMenuButtonState) {
            buttonIcon.style.transform = "rotate(180deg) scale(0)";
            profileInfo.classList.toggle("active");
            dropMenuButtonState = false;
            buttonIcon.style.transform = "rotate(180deg) scale(1)";
        }
    })
}; 

let addFriendButtonState = false;
export function addFriendButton(event: React.FormEvent<HTMLButtonElement>) {
    const button = event.currentTarget as HTMLElement;
    const friendAddDiv = button.parentElement?.parentElement?.querySelector(".friends-add-div") as HTMLElement;

    if (!addFriendButtonState) {
        friendAddDiv.style.display = "flex";
        addFriendButtonState = true;
    } else {
        friendAddDiv.style.display = "none";
        addFriendButtonState = false;
    }
    document.addEventListener("click", function(event) {
        if (!friendAddDiv.contains(event.target as Node | null) && !button.contains(event.target as Node | null) && addFriendButtonState) {
            friendAddDiv.style.display = "none";
            addFriendButtonState = false;
        }
    })
};

export async function checkAccessTokenExistance(access_token: string, refresh_token: string) {
    try {
        const response = await axios.get(API_URL + "/user", {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        })
        
        return response.status;
    } catch (error: any) {
        if (error.response.status === 401) {
            const response = await axios.post(API_URL + "/refresh_access_token", { refresh_token }, {
                headers: {
                    "Authorization": `Bearer ${refresh_token}`,
                    "Content-Type": "application/json",
                },
            })
            .catch((e) => {
                console.log(e)
                if (e.response.status === 401) {
                    window.location.href = "/logout";
                }
            })

            return response?.data;
        }
    }
};

export function getFriendRequests(access_token: string) {
    return axios.get(API_URL + "/friend_requests", {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
    })
};

export async function getUserData(access_token: string) {
    return await axios.get("http://127.0.0.1:5000/api/user", {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
    })
};

let friendRequestButtonState = false;
export function friendRequestButton(event: React.FormEvent<HTMLButtonElement>) {
    const button = event.currentTarget as HTMLElement;
    const friendReqsDiv = button.parentElement?.parentElement?.querySelector(".friend-req-div") as HTMLElement;

    if (!friendRequestButtonState) {
        friendReqsDiv.style.display = "flex";
        friendRequestButtonState = true;
    } else {
        friendReqsDiv.style.display = "none";
        friendRequestButtonState = false;
    }
    document.addEventListener("click", function(event) {
        if (!friendReqsDiv.contains(event.target as Node | null) && !button.contains(event.target as Node | null) && friendRequestButtonState) {
            friendReqsDiv.style.display = "none";
            friendRequestButtonState = false;
        }
    })
}

export function friendRequestHoverEnter(event: React.MouseEvent<HTMLSpanElement>) {
    const target = event.currentTarget as HTMLElement;
    const frRejectButton = target.querySelector(".fr-reject") as HTMLElement;
    const frAcceptButton = target.querySelector(".fr-accept") as HTMLElement;

    frRejectButton.style.display = "flex";
    frAcceptButton.style.display = "flex";
};

export function friendRequestHoverLeave(event: React.MouseEvent<HTMLSpanElement>) {
    const target = event.currentTarget as HTMLElement;
    const frRejectButton = target.querySelector(".fr-reject") as HTMLElement;
    const frAcceptButton = target.querySelector(".fr-accept") as HTMLElement;

    frRejectButton.style.display = "none";
    frAcceptButton.style.display = "none";
};

export function rejectFriendRequest(event: React.FormEvent<HTMLButtonElement>, access_token: string) {
    const button = event.currentTarget as HTMLElement;
    const requesterUsername = button.parentElement?.parentElement?.querySelector(".req-u-usr") as HTMLElement;

    axios.delete(API_URL + "/friend_requests", {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        data: {
            req_username: requesterUsername.textContent
        }
    })
};

export function sendFriendRequest(event: React.FormEvent<HTMLFormElement>, access_token: string) {
    event.preventDefault();
    const form = event.currentTarget as HTMLElement;
    const userId = form?.querySelector(".friend-id-inp") as HTMLInputElement;
    const errorSpan = form?.querySelector(".friend-req-error") as HTMLSpanElement;

    const data = {
        req_user_id: userId.value
    }
    console.log(userId.value)
    
    axios.post(API_URL + "/friend_requests", data, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        }
    })
    .then((res) => {
        if (res.status === 200) {
            userId.value = "";
            errorSpan.innerText = "";
            errorSpan.style.display = "none";
        }
    })
    .catch((e) => {
        errorSpan.innerText = `${e.response.data}`;
        errorSpan.style.display = "block"
    })
};


export function acceptFriendRequest(event: React.FormEvent<HTMLButtonElement>, access_token: string) {
    const button = event.currentTarget as HTMLElement;
    const requesterUsername = button.parentElement?.parentElement?.querySelector(".req-u-usr") as HTMLElement;

    const data = {
        req_username: requesterUsername.textContent
    }

    axios.put(API_URL + "/friends", data, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        }
    })
};

export function getChatData(access_token: string, friendId: string) {
    const data = {
        user_id: friendId
    }

    return axios.post(API_URL + "/user", data, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        }
    })
};

export function getChatMessages(access_token: string, friendId: string) {
    const data = {
        friend_id: friendId
    }

    return axios.post(API_URL + "/chat", data, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        }
    })
};

export function userChatSocket(socket: any, user_id: string, friend_id: string) {
    const roomId = GenerateRoomId(user_id, friend_id)
    socket.emit("join_room", { room: roomId });

    socket.emit("user_chat", {user_id: user_id, friend_id: friend_id})
};

function GenerateRoomId(current_user_id: string, friend_id: string) {
    const sortedIds = [current_user_id, friend_id].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
};

const scrollHeights: Set<number> = new Set();
function handleMessageInputChange(event: any, shiftEnter: boolean) {
    const textArea = event.currentTarget as HTMLTextAreaElement;
    const messageDiv = textArea.parentElement?.parentElement?.parentElement?.parentElement;
    const inputDiv = textArea.parentElement?.parentElement;
    const sendButton = textArea.parentElement?.parentElement?.querySelector(".msg-send-button") as HTMLButtonElement;

    if (textArea.value) sendButton.classList.remove("disabled");

    scrollHeights.add(textArea.scrollHeight);
    if (messageDiv && inputDiv) {
        const currentInputHeight = parseInt(inputDiv.style.height) || 0;
        const lines = (textArea.value.match(/\n/g) || []).length + 1;

        textArea.style.overflowY = "hidden";
        if (lines === 1) {
            messageDiv.style.bottom = "0px";
            inputDiv.style.height = "51.6px";
            messageDiv.style.height = "90px";
        }
        if (lines === 2) {
            messageDiv.style.bottom = "14.4px";
            inputDiv.style.height = "66px";
            messageDiv.style.height = "104.4px";
        }
        if (lines === 3) {
            messageDiv.style.bottom = "34.4px";
            inputDiv.style.height = "86px";
            messageDiv.style.height = "124.4px";
        }
        if (lines === 4) {
            messageDiv.style.bottom = "55.4px";
            inputDiv.style.height = "107px";
            messageDiv.style.height = "145.4px";
        }
        if (lines === 5) {
            messageDiv.style.bottom = "76.4px";
            inputDiv.style.height = "128px";
            messageDiv.style.height = "166.4px";
        }
        if (lines === 6) {
            messageDiv.style.bottom = "97.4px";
            inputDiv.style.height = "149px";
            messageDiv.style.height = "187.4px";
        }
        if (textArea.value === '') {
            messageDiv.style.bottom = "0px";
            inputDiv.style.height = "51.6px";
            messageDiv.style.height = "90px";
            sendButton.classList.add("disabled");
        }
        if (currentInputHeight === 149) {
            textArea.style.overflowY = "auto";
        }
        if (shiftEnter) {
            textArea.style.height = `${textArea.scrollHeight + 38.4}px`
        }
    }
};

export function handleMessageInput(event: React.FormEvent<HTMLTextAreaElement>) {
    handleMessageInputChange(event, false);
};

export function handleMessageKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>, user_id: string, author_username: string, friend_id: string, access_token: string) {
    const textArea = event.currentTarget as HTMLTextAreaElement;
    const sendButton = textArea.parentElement?.parentElement?.querySelector(".msg-send-button") as HTMLButtonElement;
    const chatDiv = textArea.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(".chat-main-div") as HTMLElement;

    const roomId = GenerateRoomId(user_id, friend_id);
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (textArea.value) {
            const data = {
                friend_id: friend_id, author_username: author_username, message: textArea.value, room_id: roomId
            }
        
            axios.put(API_URL + "/chat", data, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    textArea.value = '';
                    sendButton.classList.add("disabled");
                    chatDiv.scrollTop = chatDiv.scrollHeight;
                }
            })
        }
    }
    if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();

        const cursorPosition = textArea.selectionStart;
        const textBeforeCursor = textArea.value.substring(0, cursorPosition);
        const textAfterCursor = textArea.value.substring(cursorPosition);

        const updatedText = `${textBeforeCursor}\n${textAfterCursor}`;

        textArea.value = updatedText;
        textArea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        textArea.scrollTop = textArea.scrollHeight;
        handleMessageInputChange(event, true);
    }
};

export function handleMessageFormSubmit(event: React.FormEvent<HTMLFormElement>, user_id: string, author_username: string, friend_id: string, access_token: string) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const textArea = form.querySelector('.message-input') as HTMLTextAreaElement;
    const sendButton = form.querySelector(".msg-send-button") as HTMLButtonElement;
    const chatDiv = form.parentElement?.parentElement?.querySelector(".chat-main-div") as HTMLElement;

    const roomId = GenerateRoomId(user_id, friend_id);  
    if (textArea.value) {
        const data = {
            friend_id: friend_id, author_username: author_username, message: textArea.value, room_id: roomId
        }
    
        axios.put(API_URL + "/chat", data, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if (res.status === 200) {
                textArea.value = '';
                sendButton.classList.add("disabled");
                chatDiv.scrollTop = chatDiv.scrollHeight;
            }
        })
    }
    
};

export function fixElementsScroll(element: HTMLElement) {
    element.scrollTop = element.scrollHeight;
};

export function convertDate(inputDate: string): string {
    const inputDateTime = new Date(inputDate);
    const currentDateTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDateTime.getTime() - inputDateTime.getTime();

    // Calculate days difference
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        // Today
        return `Today at ${formatAMPM(inputDateTime)}`;
    } else if (daysDifference === 1) {
        // Yesterday
        return `Yesterday at ${formatAMPM(inputDateTime)}`;
    } else {
        return inputDateTime.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }
}
  
function formatAMPM(date: Date): string {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // 0 should be converted to 12
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
}