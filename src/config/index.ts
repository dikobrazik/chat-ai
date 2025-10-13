export const IS_DEV = process.env.IS_DEV === 'true' || process.env.NEXT_PUBLIC_IS_DEV === 'true';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
export const AUTH_REDIRECT_URI = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI;