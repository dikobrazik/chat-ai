import { isAxiosError } from "axios";

export function isTokenExpiredError(error: any) {
  return (
    isAxiosError(error) &&
    Boolean(
      error.response &&
        error.response.status === 401 &&
        error.response.data.error === "token_expired",
    )
  );
}

export function isRefreshTokenExpiredError(error: any) {
  return (
    isAxiosError(error) &&
    Boolean(
      error.response &&
        error.response.status === 401 &&
        error.response.data.error === "refresh_token_expired",
    )
  );
}
