import React from "react";

import "../../../styles/Friends/FriendsHeader/styles.css";

import { 
    friendRequestButton, 
    addFriendButton, 
    rejectFriendRequest, 
    acceptFriendRequest, 
    friendRequestHoverEnter, 
    friendRequestHoverLeave, 
    sendFriendRequest
} from "../../../utils/functions/functions";

import { userDataType, friendRequestDataType, userAccessType } from "../../../utils/types/types";

interface FriendsHeaderProps {
    userData?: userDataType | null;
    friendRequest?: friendRequestDataType[] | null;
    userAccess?: userAccessType | null;
    showFriendList?: boolean;
    toggleFriendList?: () => void;
};

const FriendsHeader: React.FC<FriendsHeaderProps> = ({userData, friendRequest, userAccess, showFriendList, toggleFriendList}) => {

    return (
        <div className='friends-header'>
            {showFriendList ? (
                <span  className='friends-header-sp'>Friends</span>
            ) : (
                <span  className='friends-header-sp'>Chats</span>
            )}
            <div className='friends-header-b'>
                <button className='friends-button' onClick={toggleFriendList}>
                    <svg fill="aliceblue" width="20px" height="20px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.25 20.5c1.281 0.719 2 1.906 1.875 3.125-0.063 0.75-0.031 0.75-1 0.875-0.594 0.063-4.375 0.094-8.219 0.094-4.375 0-8.938-0.031-9.281-0.125-1.281-0.344-0.531-2.719 1.156-3.844 1.344-0.844 4.063-2.156 4.813-2.313 1.031-0.219 1.156-0.875 0-2.844-0.25-0.469-0.531-1.813-0.563-3.25-0.031-2.313 0.375-3.875 2.406-4.656 0.375-0.125 0.813-0.188 1.219-0.188 1.344 0 2.594 0.75 3.125 1.844 0.719 1.469 0.375 5.313-0.375 6.719-0.906 1.594-0.813 2.094 0.188 2.344 0.625 0.156 2.688 1.125 4.656 2.219zM24.094 18.531c1 0.531 1.563 1.5 1.469 2.438-0.031 0.563-0.031 0.594-0.781 0.688-0.375 0.063-2.344 0.094-4.656 0.094-0.406-0.969-1.188-1.844-2.25-2.406-1.219-0.688-2.656-1.406-3.75-1.875 0.719-0.344 1.344-0.625 1.625-0.688 0.781-0.188 0.875-0.625 0-2.188-0.219-0.375-0.469-1.438-0.5-2.563-0.031-1.813 0.375-3.063 1.938-3.656 0.313-0.094 0.656-0.156 0.969-0.156 1.031 0 2 0.563 2.406 1.438 0.531 1.156 0.281 4.156-0.281 5.281-0.688 1.25-0.625 1.625 0.156 1.813 0.5 0.125 2.094 0.906 3.656 1.781z"></path>
                    </svg>
                </button>
                <button className='friends-button' onClick={friendRequestButton}>
                    {friendRequest && friendRequest.length !== 0 && friendRequest[0].user_id === userData?.user_id && (
                        <div className='amount-of-requests'>
                            {friendRequest.length <= 9 ? friendRequest.length : '9+'}
                        </div>
                    )}
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.7778 16.4066C18.1725 16.2808 18.3904 15.8588 18.2646 15.4642C18.1388 15.0696 17.7168 14.8516 17.3222 14.9774L17.7778 16.4066ZM11.6797 15.9343C11.2657 15.9455 10.9391 16.2902 10.9503 16.7043C10.9615 17.1183 11.3062 17.4449 11.7203 17.4337L11.6797 15.9343ZM16.876 16.0131C17.0578 16.3853 17.5068 16.5397 17.8791 16.358C18.2513 16.1762 18.4057 15.7272 18.224 15.3549L16.876 16.0131ZM16.9104 14.374L16.2225 14.6728C16.2269 14.683 16.2316 14.6931 16.2364 14.7031L16.9104 14.374ZM15.9422 10.806L16.6868 10.7157C16.6855 10.7048 16.6839 10.694 16.6821 10.6832L15.9422 10.806ZM11.7068 5.941C11.2926 5.941 10.9568 6.27679 10.9568 6.691C10.9568 7.10521 11.2926 7.441 11.7068 7.441V5.941ZM11.7068 7.441C12.121 7.441 12.4568 7.10521 12.4568 6.691C12.4568 6.27679 12.121 5.941 11.7068 5.941V7.441ZM7.45778 10.807L6.71795 10.6839C6.71614 10.6948 6.71457 10.7057 6.71325 10.7166L7.45778 10.807ZM6.48961 14.374L7.16357 14.7031C7.16843 14.6931 7.17308 14.683 7.1775 14.6728L6.48961 14.374ZM5.17605 15.3549C4.99431 15.7272 5.14873 16.1762 5.52095 16.358C5.89317 16.5397 6.34223 16.3853 6.52397 16.0131L5.17605 15.3549ZM10.9568 6.691C10.9568 7.10521 11.2926 7.441 11.7068 7.441C12.121 7.441 12.4568 7.10521 12.4568 6.691H10.9568ZM12.4568 5C12.4568 4.58579 12.121 4.25 11.7068 4.25C11.2926 4.25 10.9568 4.58579 10.9568 5H12.4568ZM10.9568 6.691C10.9568 7.10521 11.2926 7.441 11.7068 7.441C12.121 7.441 12.4568 7.10521 12.4568 6.691H10.9568ZM12.4568 5C12.4568 4.58579 12.121 4.25 11.7068 4.25C11.2926 4.25 10.9568 4.58579 10.9568 5H12.4568ZM6.07781 14.9774C5.68317 14.8516 5.26125 15.0696 5.13544 15.4642C5.00963 15.8588 5.22756 16.2808 5.6222 16.4066L6.07781 14.9774ZM11.6797 17.4337C12.0938 17.4449 12.4385 17.1183 12.4497 16.7043C12.4609 16.2902 12.1343 15.9455 11.7203 15.9343L11.6797 17.4337ZM10.5 16.523C10.5 16.1088 10.1642 15.773 9.75001 15.773C9.33579 15.773 9.00001 16.1088 9.00001 16.523H10.5ZM14.4049 16.523C14.4049 16.1088 14.0691 15.773 13.6549 15.773C13.2407 15.773 12.9049 16.1088 12.9049 16.523H14.4049ZM17.3222 14.9774C15.4929 15.5606 13.5943 15.8825 11.6797 15.9343L11.7203 17.4337C13.7761 17.3782 15.8144 17.0325 17.7778 16.4066L17.3222 14.9774ZM18.224 15.3549L17.5844 14.0449L16.2364 14.7031L16.876 16.0131L18.224 15.3549ZM17.5983 14.0752C17.1347 13.008 16.8275 11.8759 16.6868 10.7157L15.1977 10.8963C15.3558 12.1997 15.701 13.4723 16.2225 14.6728L17.5983 14.0752ZM16.6821 10.6832C16.4696 9.40313 16.017 8.21501 15.1948 7.33897C14.3526 6.44171 13.1869 5.941 11.7068 5.941V7.441C12.8193 7.441 13.5729 7.80279 14.1011 8.36553C14.6492 8.94949 15.0181 9.81887 15.2024 10.9288L16.6821 10.6832ZM11.7068 5.941C10.2266 5.941 9.05835 6.44146 8.21321 7.33789C7.38755 8.21366 6.93123 9.40201 6.71795 10.6839L8.19761 10.9301C8.38214 9.82099 8.75359 8.95134 9.30463 8.36686C9.83619 7.80304 10.5936 7.441 11.7068 7.441V5.941ZM6.71325 10.7166C6.57244 11.8765 6.26519 13.0083 5.80171 14.0752L7.1775 14.6728C7.69888 13.4727 8.04413 12.2004 8.20232 10.8974L6.71325 10.7166ZM5.81565 14.0449L5.17605 15.3549L6.52397 16.0131L7.16357 14.7031L5.81565 14.0449ZM12.4568 6.691V5H10.9568V6.691H12.4568ZM12.4568 6.691V5H10.9568V6.691H12.4568ZM5.6222 16.4066C7.58558 17.0325 9.62394 17.3782 11.6797 17.4337L11.7203 15.9343C9.80576 15.8825 7.90713 15.5606 6.07781 14.9774L5.6222 16.4066ZM9.00001 16.523V17.023H10.5V16.523H9.00001ZM9.00001 17.023C9.00001 18.5252 10.1921 19.7755 11.7024 19.7755V18.2755C11.0561 18.2755 10.5 17.7327 10.5 17.023H9.00001ZM11.7024 19.7755C13.2127 19.7755 14.4049 18.5252 14.4049 17.023H12.9049C12.9049 17.7327 12.3487 18.2755 11.7024 18.2755V19.7755ZM14.4049 17.023V16.523H12.9049V17.023H14.4049Z" fill="aliceblue"/>
                    </svg>
                </button>
                <button className='friends-button' onClick={addFriendButton}>+</button>
            </div>
            <div className='friends-ut-div friend-req-div top-6 column'>
                {friendRequest && friendRequest.length > 0 && friendRequest[0].user_id === userData?.user_id ? friendRequest.map((request, index) => (
                    <div className='friend-request' key={index} onMouseEnter={friendRequestHoverEnter} onMouseLeave={friendRequestHoverLeave}>
                        <div className='fr-left req-u-usr'>{request.req_user_username}</div>
                        <div className='fr-right'>
                            <button className='fr-button fr-reject' onClick={(event) => rejectFriendRequest(event, userAccess?.access_token ?? '')}>X</button>
                            <button className='fr-button fr-accept' onClick={(event) => acceptFriendRequest(event, userAccess?.access_token ?? '')}>
                                <svg width="800px" height="800px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 12.5L10.167 17L19.5 8" stroke="aliceblue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className='friend-request disable-hover'>
                        Friend requests will be here
                    </div>
                )}
            </div>
            <div className='friends-ut-div friends-add-div top-6'>
                <form className='friend-req-form' onSubmit={(event) => sendFriendRequest(event, userAccess?.access_token ?? '')}>
                    <div className='f-left-d column'>
                        <label htmlFor="friend-id-inp">User ID</label>
                        <input type="text" id='friend-id-inp' className='friend-id-inp' required minLength={8} maxLength={8}/>
                        <span className='friend-req-error'></span>
                    </div>
                    <div className='f-right-d'>
                        <button className='friend-id-submit-btn' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default FriendsHeader;