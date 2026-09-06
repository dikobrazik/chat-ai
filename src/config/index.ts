export const IS_DEV =
  process.env.IS_DEV === "true" || process.env.NEXT_PUBLIC_IS_DEV === "true";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
export const BASE_API_URL = `${BASE_URL}/api`;
export const AUTH_REDIRECT_URI = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI;

// TerminalKey из личного кабинета Т-Кассы; публичный идентификатор, не секрет —
// виджет оплаты картой отдаёт его в браузер. Без него форма карты не грузится
export const KASSA_TERMINAL_KEY = process.env.NEXT_PUBLIC_KASSA_TERMINAL_KEY;
