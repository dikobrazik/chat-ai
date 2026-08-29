"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getProfile } from "@/api/user";
import { Divider } from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import Button from "@/ui/Button";
import styles from "./Profile.module.scss";

const USER_STATUS_MAP: Record<string, string> = {
  active: "Бесплатный",
  subscription_plus: "Плюс",
  subscription_pro: "Профессиональный",
};

const USER_STATUS_COLOR_MAP: Record<string, string> = {
  active: "#9C9C9C",
  subscription_plus: "#0F8AFF",
  subscription_pro: "#FF6B34",
};

const ProfileAvatar = () => {
  const { isGuest } = useAuthContext();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  return (
    // аватар обязан идти через /_next/image (same-origin): CSP прод-nginx
    // разрешает img-src только 'self' + бакет генераций, прямую загрузку с
    // avatars.yandex.net / lh3.googleusercontent.com браузер блокирует.
    // eager: lazy-img после ремаунта (сворачивание сайдбара) может вообще
    // не начать загрузку — аватар остаётся пустым
    <Image
      className={styles.profilePhoto}
      src={profile?.photo ?? "/default-avatar.svg"}
      fetchPriority="low"
      loading="eager"
      alt="Profile Photo"
      width={200}
      height={200}
    />
  );
};

const ProfileInfo = () => {
  const { isGuest } = useAuthContext();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  return (
    <div className="w-full flex items-center gap-3">
      <ProfileAvatar />

      <div className="flex flex-col w-auto">
        <Text type="s" style="medium" className="truncate">
          {profile?.name ?? profile?.email}
        </Text>
        <Text
          type="xs"
          style="regular"
          color={USER_STATUS_COLOR_MAP[profile?.status ?? "active"]}
        >
          {USER_STATUS_MAP[profile?.status ?? "active"]}
        </Text>
      </div>
    </div>
  );
};

const ProfileMenu = () => {
  const { onLogoutClick } = useAuthContext();

  return (
    <>
      <ProfileInfo />
      <div className="flex flex-col gap-2">
        <Button align="center" variant="primary" as="a" href="/plans">
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
    </>
  );
};

export const Profile = ({ collapsed }: { collapsed?: boolean }) => {
  const { isReady } = useAuthContext();

  if (!isReady) {
    return <Button loading />;
  }

  // в свёрнутом сайдбаре от профиля остаётся только аватар с тем же меню
  if (collapsed) {
    return (
      <Popover
        popoverClassName={styles.profilePopover}
        position="top"
        align="start"
        Trigger={(props) => (
          <Button
            {...props}
            className={cn(props.className, styles.avatarButton)}
            leftIcon={<ProfileAvatar />}
          />
        )}
      >
        <ProfileMenu />
      </Popover>
    );
  }

  return (
    <div className="flex gap-3 w-full items-center">
      <ProfileInfo />

      {/* align=end: правый край меню по кнопке «...» — меню остаётся в пределах сайдбара */}
      <Popover
        popoverClassName={styles.profilePopover}
        position="top"
        align="end"
        Trigger={(props) => (
          <Button {...props} leftIcon={<Icon name="more" />} />
        )}
      >
        <ProfileMenu />
      </Popover>
    </div>
  );
};
