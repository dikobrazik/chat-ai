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
