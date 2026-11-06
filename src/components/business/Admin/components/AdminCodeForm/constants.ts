import * as yup from "yup";

export const ADMIN_CODE_SCHEMA = yup.object({
  code: yup
    .string()
    .length(6, "Код должен быть ровно 6 символов")
    .required("Введите код из письма"),
});
