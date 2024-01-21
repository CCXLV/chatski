import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export async function register(username: string, email: string, password: string) {
    return await axios.post(API_URL + "/registration", {
        username: username, email: email, password: password
    })
    .then((response) => {
        if (response.status === 200) {
            window.location.href = "/login";
        }
    })
    .catch((e) => {
        console.log(e)
        if (e.response.data === "Username is already taken") {
            const errorSpan = document.querySelector(".username-error") as HTMLElement;
            const emailError = document.querySelector(".email-error") as HTMLElement;
            emailError.style.display = "none";
            errorSpan.innerHTML = "*Username is already taken";
            errorSpan.style.display = "inline";
        } else {
            const errorSpan = document.querySelector(".email-error") as HTMLElement;
            const usernameError = document.querySelector(".username-error") as HTMLElement;
            usernameError.style.display = "none";
            errorSpan.innerHTML = "*Email is already taken";
            errorSpan.style.display = "inline";
        }
    })
};

export async function authorization(email: string, password: string) {
    return await axios.post(API_URL + "/authorization", {
        email: email, password: password
    })
    .then((response) => {
        if (response.data.access_token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/";
        }
    })
    .catch((e) => {
        if (e.response.status === 400) {
            const errorSpan = document.querySelector(".login-error") as HTMLElement;
            errorSpan.innerHTML = "*Email or password is invalid";
            errorSpan.style.display = "inline";
        }
    })
};

export function logout() {
    localStorage.removeItem("user");
};

export function getCurrentUser() {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);

    return null;
};