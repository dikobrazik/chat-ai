"use client";

import { useAuthContext } from "@/providers/AuthProvider/hooks";
import Button from "@/ui/Button";
import Modal, { useModal } from "@/ui/Modal";
import { AuthorizationModal } from "./Modal";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/user";
import Image from "next/image";
import styles from "./Authorization.module.scss";
import Popover from "@/components/ui/Popover";
import Icon from "@/components/ui/Icon";
import classNames from "classnames";

export const AuthorizationButton = () => {
  const { isReady, isGuest, onLogoutClick } = useAuthContext();
  const { isOpen, openModal, closeModal } = useModal();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !isGuest,
  });

  if (!isReady) {
    return <Button loading />;
  }

  return (
    <>
      {isGuest ? (
        <Button variant="primary" onClick={openModal}>
          Войти
        </Button>
      ) : (
        <Popover
          popoverClassName={styles.profilePopover}
          Trigger={(props) => (
            <Button
              {...props}
              className={classNames(props.className, styles.profileButton)}
            >
              {Boolean(profile?.photo) && (
                <Image
                  className={styles.profilePhoto}
                  src={profile?.photo as string}
                  fetchPriority="low"
                  alt="Profile Photo"
                  width={200}
                  height={200}
                />
              )}
            </Button>
          )}
        >
          <Button rounded={false} size="sm" href="/profile">
            Профиль
          </Button>
          <Button rounded={false} size="sm" href="/subscriptions">
            Подписки
          </Button>
          <Button
            rounded={false}
            leftIcon={<Icon size="12" name="logout" />}
            size="sm"
            onClick={onLogoutClick}
          >
            Выйти
          </Button>
        </Popover>
      )}

      <Modal onClose={closeModal} isOpen={isOpen}>
        <AuthorizationModal />
      </Modal>
    </>
  );
};
