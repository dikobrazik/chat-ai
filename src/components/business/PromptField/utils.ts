const isComposing = (event: React.KeyboardEvent) =>
  event.nativeEvent.isComposing || event.keyCode === 229;

export const isLineBreakShortcut = (event: React.KeyboardEvent) =>
  event.key === "Enter" &&
  (event.ctrlKey || event.metaKey) &&
  !isComposing(event);

export const isSendShortcut = (event: React.KeyboardEvent) =>
  event.key === "Enter" &&
  !event.shiftKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !isComposing(event);

export const insertLineBreak = (textarea: HTMLTextAreaElement) => {
  document.execCommand("insertText", false, "\n");

  if (textarea.selectionEnd === textarea.value.length) {
    textarea.scrollTop = textarea.scrollHeight;
  }
};
