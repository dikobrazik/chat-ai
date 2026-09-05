import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useChat } from "@/api";
import { useRenameChat } from "@/api/chat/hooks/useRenameChat";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { TextField } from "@/components/ui/TextField";

type Inputs = {
  newTitle: string;
};

const schema = yup.object({
  newTitle: yup
    .string()
    .min(3, "Название должно быть не менее 3 символов")
    .required("Название обязательно"),
});

export const RenameChatModal = () => {
  const router = useRouter();
  const { id: chatId } = useParams();
  const { renameChat, isPending } = useRenameChat(chatId as string);
  const { chat, isLoading } = useChat(chatId as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    renameChat(data.newTitle, { onSuccess: () => router.back() });
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => router.back()}
      title="Изменить название чата"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          size="l"
          readOnly={isPending || isLoading}
          type="text"
          defaultValue={chat?.title ?? ""}
          error={errors.newTitle?.message}
          {...register("newTitle")}
        />
        <div className="flex gap-3">
          <Button
            className="flex-1"
            variant="base"
            align="center"
            size="m"
            loading={isPending || isLoading}
            onClick={() => router.back()}
          >
            Отмена
          </Button>
          <Button
            className="flex-1"
            type="submit"
            loading={isPending || isLoading}
            variant="primary"
            align="center"
            size="m"
          >
            Изменить
          </Button>
        </div>
      </form>
    </Modal>
  );
};
