import { List, ListItem } from "@/components/ui/List";
import { Text } from "@/components/ui/Text";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";
import { PLAN_DESCRIPTION } from "./constants";

export const PlanDescription = () => {
  const { plan } = useSubscriptionState();

  if (!plan) {
    return null;
  }

  return (
    <List>
      <ListItem>
        <Text color="#6F6F6F" type="xs">
          {PLAN_DESCRIPTION[plan.id]}
        </Text>
      </ListItem>

      {plan.features.slice(1).map((feature) => (
        <ListItem key={feature}>{feature}</ListItem>
      ))}
    </List>
  );
};
