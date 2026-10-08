import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Profile, type UpdateProfilePayload, updateProfile } from "..";
import { PROFILE_QUERY_KEY } from "./useProfile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onMutate: async (payload: UpdateProfilePayload) => {
      await queryClient.cancelQueries({ queryKey: PROFILE_QUERY_KEY });

      const previousProfile =
        queryClient.getQueryData<Profile>(PROFILE_QUERY_KEY);

      queryClient.setQueryData<Profile>(PROFILE_QUERY_KEY, (profile) =>
        profile ? { ...profile, ...payload } : profile,
      );

      return { previousProfile };
    },
    onError: (_error, _payload, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(PROFILE_QUERY_KEY, context.previousProfile);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};
