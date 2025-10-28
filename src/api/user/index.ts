import axios from "axios";

export type Profile = {
  id: string;
  email: string;
  name: null;
  photo: string;
  status: string;
  created_at: string;
}

export const getProfile = () => axios.get<Profile>("user/profile").then(response => response.data);