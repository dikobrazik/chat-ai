import { GoogleCredentialResponse } from "@/types";
import { useEffect, useRef } from "react";

function handleCredentialResponse(response: GoogleCredentialResponse) {
  // response.credential содержит JWT (JSON Web Token)
  const idToken = response.credential;
  console.log("Received ID Token:", idToken);

  // Здесь должен быть код для отправки idToken на ваш бэкенд для верификации
  // и создания сессии пользователя.
}

export const GoogleSignInButton = () => {
  // useRef используется для привязки к элементу, в котором будет рендериться кнопка.
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, что глобальный объект google доступен и элемент существует
    if (window.google && buttonRef.current) {
      // Инициализация Google Identity Services
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // 1. Ваш Client ID
        // 2. Передача функции-колбэка
        callback: handleCredentialResponse,
      });

      // 3. Рендеринг кнопки в указанном DOM-элементе
      window.google.accounts.id.renderButton(
        buttonRef.current, // Элемент, куда встраивается кнопка
        {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
        }, // Настройки внешнего вида
      );

      // Необязательно: Отобразить Google One Tap
      // window.google.accounts.id.prompt();
    }
  }, []); // Перезапускать эффект, только если изменится clientId

  return (
    <div
      ref={buttonRef}
      className="google-sign-in-button-container"
      // data-callback не используется, так как мы инициализируем кнопку через JS-API
    >
      {/* Кнопка будет встроена сюда */}
    </div>
  );
};
