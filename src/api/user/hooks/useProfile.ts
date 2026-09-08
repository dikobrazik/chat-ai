import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { getProfile, type Profile } from "..";

const USE_PROFILE_QUERY_KEY = ["profile"];

export const useProfile = (
  options?: Omit<
    UndefinedInitialDataOptions<Profile, Error, Profile, string[]>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...options,
    queryKey: USE_PROFILE_QUERY_KEY,
    queryFn: getProfile,
    refetchInterval: false,
  });
};
