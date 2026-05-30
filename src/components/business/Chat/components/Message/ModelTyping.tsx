import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import styles from "./Message.module.scss";

const TYPING_MESSAGES = [
  "Обрабатываю запрос",
  "Анализирую ваш запрос",
  "Формирую структуру ответа",
  "Ищу информацию",
  "Формирую ответ",
  "Уточняю детали",
  "Почти готово",
];

export const ModelTyping = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % TYPING_MESSAGES.length);
    }, 2000); // Меняем сообщение каждые 2 секунды

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, []);

  return (
    <div className="flex gap-3">
      <Logo size="small" />

      <Text style="regular" type="s" color="#9C9C9C">
        {TYPING_MESSAGES[messageIndex]}&nbsp;
        <span className={styles.typingIndicator}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </span>
      </Text>
    </div>
  );
};
