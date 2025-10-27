import axios from "axios";

export type ModelProvider = {
  id: number;
  name: string;
  models: Model[];
}

export type Model = {
  id: number;
  provider_id: number;
  name: string;
  description: string;
  available_for_status: string;
}

export const getProviders = () =>
  axios.get<ModelProvider[]>("model").then((response) => response.data);
