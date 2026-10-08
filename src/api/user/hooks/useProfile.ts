import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { getProfile, type Profile } from "..";

export const PROFILE_QUERY_KEY = ["profile"];

export const useProfile = (
  options?: Omit<
    UndefinedInitialDataOptions<Profile, Error, Profile, string[]>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...options,
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
    refetchInterval: false,
  });
};
