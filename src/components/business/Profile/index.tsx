import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfile } from "@/api";
import { getPlans } from "@/api/subscription";
import { Badge } from "@/components/ui/Badge";
import { Banner } from "@/components/ui/Banner";
import Button from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import { List, ListItem } from "@/components/ui/List";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { Switch } from "@/components/ui/Switch";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";

export const ProfileSettings = () => {
  const router = useRouter();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: plans = [] } = useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: getPlans,
  });

  return (
    <Modal size="large" isOpen onClose={() => router.back()} title="Аккаунт">
      <Modal.Sidebar className="flex flex-col justify-between gap-6">
        <div className="flex flex-row items-center gap-3">
          <Logo />

          <Text type="s" as="h1">
            Jonu AI
          </Text>
        </div>

        <div className="flex flex-col gap-1">
          <Button leftIcon={<Icon name="profile-circle" />}>Аккаунт </Button>
          <Button leftIcon={<Icon name="setting" />}>
            Управление&nbsp;данными
          </Button>
          <Button
            disabled
            leftIcon={<Icon name="card" />}
            rightIcon={
              <Badge size="s" variant="secondary">
                <Text type="s">Скоро</Text>
              </Badge>
            }
          >
            Оплата{" "}
          </Button>
          <Button leftIcon={<Icon name="info-circle" />}>
            О&nbsp;программе
          </Button>
          <Button leftIcon={<Icon name="message-question" />}>Справка </Button>
        </div>
      </Modal.Sidebar>
      <div className="flex flex-col gap-6">
        <Banner
          title="Откройте полный доступ без ограничений"
          description="Создавайте быстрее — без лимитов и ожиданий"
          action={
            <Button variant="primary">Открыть&nbsp;полный&nbsp;доступ</Button>
          }
          direction="row"
        />

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
                  .map((feature) => (
                    <ListItem key={feature}>{feature}</ListItem>
                  ))
              : null}
          </List>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Text color="#6F6F6F" type="xs">
            Имя
          </Text>

          <div className="flex gap-2">
            <TextField readonly value={profile?.name ?? ""} />
            <Button variant="base" leftIcon={<Icon name="edit" />} />
          </div>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Text color="#6F6F6F" type="xs">
            E-mail
          </Text>

          <div className="flex gap-2">
            <TextField readonly value={profile?.email} />
            <Button variant="base" leftIcon={<Icon name="edit" />} />
          </div>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Text color="#6F6F6F" type="xs">
            Присылать обновления на почту
          </Text>

          <Switch />
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Text color="#6F6F6F" type="xs">
            Пароль
          </Text>

          <div className="flex gap-2">
            <TextField readonly />
            <Button variant="base" leftIcon={<Icon name="edit" />} />
          </div>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Text color="#6F6F6F" type="xs">
            Выйти из этого устройства
          </Text>

          <Button variant="base">Выйти</Button>
        </div>
      </div>
    </Modal>
  );
};
