export const preventDefault =
  <T extends React.MouseEvent | React.KeyboardEvent | React.TouchEvent>(
    cb: (event: T) => void,
  ) =>
  (event: T) => {
    event.preventDefault();
    cb(event);
  };

export const stopPropagation =
  <T extends React.MouseEvent | React.KeyboardEvent | React.TouchEvent>(
    cb?: (event: T) => void,
  ) =>
  (event: T) => {
    event.stopPropagation();
    cb?.(event);
  };
