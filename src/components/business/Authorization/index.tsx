"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getProfile } from "@/api/user";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import Button from "@/ui/Button";
import styles from "./Authorization.module.scss";

const ProfileInfo = () => {
  const { isGuest } = useAuthContext();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  return (
    <div className="w-full flex items-center gap-3">
      <Image
        className={styles.profilePhoto}
        src={profile?.photo ? (profile?.photo as string) : "default-avatar.svg"}
        fetchPriority="low"
        alt="Profile Photo"
        width={200}
        height={200}
      />

      <div className="flex flex-col w-[50%]">
        <Text type="s" style="medium" className="truncate">
          {profile?.name ?? profile?.email}
        </Text>
        <Text type="xs" style="regular" color="#9C9C9C">
          Бесплатный
        </Text>
      </div>
    </div>
  );
};

export const AuthorizationButton = () => {
  const { isReady, onLogoutClick } = useAuthContext();

  if (!isReady) {
    return <Button loading />;
  }

  return (
    <div className="flex gap-3 w-full items-center">
      <ProfileInfo />

      <Popover
        popoverClassName={styles.profilePopover}
        position="top"
        Trigger={(props) => (
          <Button {...props} leftIcon={<Icon name="more" />} />
        )}
      >
        <ProfileInfo />
        <div className="flex flex-col gap-2">
          <Button align="center" variant="primary" as="a" href="/subscription">
            <Text type="s" style="medium">
              Открыть полный доступ
            </Text>
          </Button>
          <Button
            as="a"
            href="/settings/profile"
            leftIcon={<Icon name="setting" />}
          >
            Настройки
          </Button>
          <Button
            as="a"
            href="/settings/help"
            leftIcon={<Icon name="message-question" />}
          >
            Справка
          </Button>
        </div>
        <Divider />
        <Button
          variant="danger"
          leftIcon={<Icon name="logout" />}
          onClick={onLogoutClick}
        >
          Выйти
        </Button>
      </Popover>
    </div>
  );
};
