import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { checkIsEmailRegistered } from "@/api";
import { useEmailAuth } from "@/providers/EmailAuthProvider/useEmailAuth";

type Inputs = {
  email: string;
  personalDataConsent: boolean;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),

  personalDataConsent: yup
    .boolean()
    .default(false)
    .test(
      "is-checked",
      "Чтобы продолжить, дайте согласие на обработку персональных данных",
      Boolean,
    ),
});

export const useLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { setEmail } = useEmailAuth();

  const consentRef = useRef<HTMLDivElement>(null);
  const consentError = errors.personalDataConsent;

  useEffect(() => {
    if (consentError) {
      consentRef.current?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [consentError]);

  const { isPending, mutate } = useMutation({
    mutationKey: ["check-email-registered"],
    mutationFn: checkIsEmailRegistered,
    onSuccess: ({ isRegistered }) => {
      if (isRegistered) {
        router.replace("/auth/sign-in");
      } else {
        router.replace("/auth/sign-up");
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmail(data.email);
    mutate(data.email);
  };

  const onProviderClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!getValues("personalDataConsent")) {
      event.preventDefault();
      trigger("personalDataConsent");
    }
  };

  const consentField = register("personalDataConsent", {
    onChange: () => clearErrors("personalDataConsent"),
  });

  return {
    register,
    errors,
    isPending,
    consentField,
    consentRef,
    onProviderClick,
    onSubmit: handleSubmit(onSubmit),
  };
};
