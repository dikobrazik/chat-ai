import axios from "axios";

export const createGuest = () =>
  axios.post<string>("auth/guest").then((response) => response.data);

export const fetchDummy = (cookies: string) =>
  axios
    .post<string>("auth/dummy", null, {
      headers: { Cookie: cookies },
    })
    .then((response) => response.data);

export const refreshAccessToken = () =>
  axios.post<string>("auth/refresh").then((response) => response.data);

export const postLogout = () =>
  axios.post<void>("auth/logout").then((response) => response.data);

export const checkIsEmailRegistered = (email: string) =>
  axios
    .post<{ isRegistered: boolean }>("auth/email/check-email", { email })
    .then((response) => response.data);

type SignInResponse = { accessToken: string; authCodeSent: boolean };

export const postEmailSignIn = (email: string, password: string) =>
  axios
    .post<SignInResponse>("auth/email/sign-in", { email, password })
    .then((response) => response.data);

export const postEmailVerify = (email: string, code: string) =>
  axios
    .post<{ accessToken: string }>("auth/email/verify", { email, code })
    .then((response) => response.data);

export const postResetPassword = (email: string) =>
  axios
    .post<void>("auth/email/reset", { email })
    .then((response) => response.data);

export const postResetNewPasswordVerify = (code: string, newPassword: string) =>
  axios
    .post<void>("auth/email/reset-verify", { code, password: newPassword })
    .then((response) => response.data);
