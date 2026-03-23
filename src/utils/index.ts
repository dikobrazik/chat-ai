export const preventDefault =
  (cb: () => void) => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    cb();
  };

export const stopPropagation =
  (cb?: () => void) =>
  (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => {
    event.stopPropagation();
    cb?.();
  };
