"use client";

import { Bounce, ToastContainer } from "react-toastify/unstyled";
import { Icon } from "@/components/ui/Icon";
import { TOAST_ICONS } from "./constants";

export const Toaster = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick={false}
    closeButton={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Bounce}
    icon={({ type }) => <Icon name={TOAST_ICONS[type]} size={20} />}
  />
);
