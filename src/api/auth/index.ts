import axios from "axios";

export const createGuest = () =>
  axios.post<string>("auth/guest").then((response) => response.data);
