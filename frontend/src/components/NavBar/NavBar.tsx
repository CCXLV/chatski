import React from "react";

import { dropdownMenu } from "../../utils/functions/functions";
import { userDataType } from "../../utils/types/types";

import "../../styles/NavBar/styles.css"

const NavBar: React.FC<userDataType> = ({ user_id, username, email }) => {
    return (
        <div className='nav-bar'>
            <div className='nav-inner'>
                <div className='nav-side'>
                    <div className='nav-profile'>
                        <div className='nav-profile-left'>{username?.charAt(0).toUpperCase()}</div>
                        <div className='nav-profile-right'>
                            <button className='dropdown-menu-button' onClick={dropdownMenu}>
                                <svg className="dropdown-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        </div>
                        <div className='profile-info'>
                            <div className='profile-info-row'>
                                <p className='profile-info-header'>Username</p>
                                <span>{username}</span>
                            </div>
                            <div className='profile-info-row'>
                                <p className='profile-info-header'>User id</p>
                                <span>{user_id}</span>
                            </div>
                            <div className='profile-info-row'>
                                <p className='profile-info-header'>Email</p>
                                <span>{email}</span>
                            </div>
                            <div className='profile-info-row'>
                                <a href="/logout">
                                    <p className='profile-info-header'>Logout</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NavBar;