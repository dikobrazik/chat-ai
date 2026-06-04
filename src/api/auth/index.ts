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

export const postEmailSignIn = (email: string, password: string) =>
  axios
    .post<void>("auth/email/sign-in", { email, password })
    .then((response) => response.data);

export const postEmailVerify = (email: string, code: string) =>
  axios
    .post<string>("auth/email/verify", { email, code })
    .then((response) => response.data);
