import axios from "axios"

const API_URL = "http://127.0.0.1:5000/api";

export function getFriendsList(access_token: string) {
    return axios.get(API_URL + "/friends", {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
    })
};