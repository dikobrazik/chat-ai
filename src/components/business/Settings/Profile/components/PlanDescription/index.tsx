import { useCurrentPlan } from "@/api";
import { List, ListItem } from "@/components/ui/List";
import { Text } from "@/components/ui/Text";
import { PLAN_DESCRIPTION } from "./constants";

export const PlanDescription = () => {
  const { data: currentPlan } = useCurrentPlan();

  return (
    <div>
      <Text type="s">Спасибо за использование Jonu AI!</Text>

      <List>
        <ListItem>
          <Text color="#6F6F6F" type="xs">
            {PLAN_DESCRIPTION[currentPlan?.id ?? "base"]}
          </Text>
        </ListItem>

        {currentPlan
          ? currentPlan.features
              .slice(1)
              .map((feature) => <ListItem key={feature}>{feature}</ListItem>)
          : null}
      </List>
    </div>
  );
};
