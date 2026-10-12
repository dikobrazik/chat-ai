export const FAVICON_URL = "https://favicon.yandex.net/favicon/v2/";

export const URL_PATTERN =
  /\]\((https?:\/\/(?:[^\s()]|\([^\s()]*\))+)\)|(https?:\/\/[^\s<>"'`[\]]+)/g;

export const URL_HOST_PATTERN = /^https?:\/\/(?:[^@/?#]*@)?([^/?#:]+)/i;

export const URL_TRAILING_PUNCTUATION_PATTERN = /[.,;:!?*~"'«»“”‘’…]+$/;
