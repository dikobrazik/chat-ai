import { useQuery } from "@tanstack/react-query";
import { getPlans } from "@/api";
import { List, ListItem } from "@/components/ui/List";
import { Text } from "@/components/ui/Text";

export const PlanDescription = () => {
  const { data: plans = [] } = useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: getPlans,
  });
  return (
    <div>
      <Text type="s">Спасибо за использование на Jonu AI!</Text>

      <List>
        <ListItem>
          <Text color="#6F6F6F" type="xs">
            С базовым доступом вам доступно:
          </Text>
        </ListItem>

        {plans[0]
          ? plans[0].features
              .slice(1)
              .map((feature) => <ListItem key={feature}>{feature}</ListItem>)
          : null}
      </List>
    </div>
  );
};
