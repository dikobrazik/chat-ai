"use client";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";
import { getProfile } from "@/api/user";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import Button from "@/ui/Button";
import Modal, { useModal } from "@/ui/Modal";
import styles from "./Authorization.module.scss";
import { AuthorizationModal } from "./Modal";

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
        <Button as="a" variant="primary" href="/login">
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
              <Image
                className={styles.profilePhoto}
                src={
                  profile?.photo
                    ? (profile?.photo as string)
                    : "default-avatar.svg"
                }
                fetchPriority="low"
                alt="Profile Photo"
                width={200}
                height={200}
              />
            </Button>
          )}
        >
          <Button rounded={false} as="a" href="/settings/profile">
            Профиль
          </Button>
          <Button rounded={false} as="a" href="/settings/subscription">
            Подписки
          </Button>
          <Button
            rounded={false}
            leftIcon={<Icon size="12" name="logout" />}
            onClick={onLogoutClick}
          >
            Выйти
          </Button>
        </Popover>
      )}

      {/* <Modal onClose={closeModal} isOpen={isOpen}>
        <AuthorizationModal />
      </Modal> */}
    </>
  );
};
