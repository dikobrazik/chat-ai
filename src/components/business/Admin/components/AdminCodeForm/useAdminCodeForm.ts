import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useConfirmAdminCode, useSendAdminCode } from "@/api";
import { ADMIN_CODE_SCHEMA } from "./constants";

type Inputs = {
  code: string;
};

export const useAdminCodeForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(ADMIN_CODE_SCHEMA) });

  const { sendCode, isCodeSent, isCodeSending } = useSendAdminCode();
  const { confirmCode, isCodeConfirming } = useConfirmAdminCode({
    onError: () => setError("code", { message: "Неверный или устаревший код" }),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => confirmCode(data.code);

  return {
    register,
    errors,
    submit: handleSubmit(onSubmit),
    sendCode,
    isCodeSent,
    isCodeSending,
    isCodeConfirming,
  };
};
