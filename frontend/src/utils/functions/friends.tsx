import axios from "axios"

const API_URL = "http://127.0.0.1:5000/api";

export async function getFriendsList(access_token: string, refresh_token: string) {
    try {
        const response = await axios.get(API_URL + "/friends", {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        })
        
        return response.data;
    } catch (error: any) {
        if (error.response.status === 401) {
            const response = await axios.post(API_URL + "/refresh_access_token", { refresh_token }, {
                headers: {
                    "Authorization": `Bearer ${refresh_token}`,
                    "Content-Type": "application/json",
                },
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    window.location.href = '/logout';
                }
            })

            return response?.data;
        }
    }
};