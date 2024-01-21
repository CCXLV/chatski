import * as AuthService from "../service/AuthService";

export function registerForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLElement;
    const usernameInput = form.querySelector(".username") as HTMLInputElement;
    const emailInput = form.querySelector(".email") as HTMLInputElement;
    const passwordInput = form.querySelector(".password") as HTMLInputElement;

    AuthService.register(usernameInput.value, emailInput.value, passwordInput.value);
};

export function loginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLElement;
    const emailInput = form.querySelector(".email") as HTMLInputElement;
    const passwordInput = form.querySelector(".password") as HTMLInputElement;

    AuthService.authorization(emailInput.value, passwordInput.value);
};

export function redirect(path: string) {
    window.location.href = path;
    return null;
};