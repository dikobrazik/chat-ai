export const getIconWidth = (size: number | string, viewBox: string) => {
  if (typeof size !== "number") {
    return size;
  }

  const [, , width, height] = viewBox.split(" ").map(Number);

  return (size * width) / height;
};
