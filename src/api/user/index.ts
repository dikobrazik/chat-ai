import axios from "axios";

export const getProfile = () => axios.get("user/profile").then(response => response.data);