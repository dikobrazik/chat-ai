import { useProfile } from "@/api/user";
import { SUBSCRIBED_USER_STATUSES } from "@/constants/user";
import { useAuthContext } from "@/providers/AuthProvider/hooks";

export const useShowUpsell = () => {
  const { isGuest } = useAuthContext();

  const { data: profile } = useProfile({ enabled: !isGuest });

  return Boolean(profile && !SUBSCRIBED_USER_STATUSES.includes(profile.status));
};
