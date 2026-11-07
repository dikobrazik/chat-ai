export type MobileOs = "ios" | "android";

export const getMobileOs = (): MobileOs | null => {
  const { userAgent, maxTouchPoints } = navigator;

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (
    /iphone|ipad|ipod/i.test(userAgent) ||
    (/macintosh/i.test(userAgent) && maxTouchPoints > 1)
  ) {
    return "ios";
  }

  return null;
};
