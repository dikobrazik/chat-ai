import { IS_DEV } from "@/config";
import React, { useEffect, useRef } from "react";

export const YandexSignInButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Убедитесь, что библиотека загружена и элемент существует
    if (window.YaAuthSuggest && buttonRef.current) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID!,
          response_type: "code",
          redirect_uri: "http://localhost/api/auth",
        },
        IS_DEV ? "http://localhost" : "https://tridva.store",
        {
          target: buttonRef.current,
          view: "button",
          parentId: "buttonContainerId",
          buttonSize: "m",
          buttonView: "main",
          buttonTheme: "light",
          buttonBorderRadius: "0",
          buttonIcon: "ya",
        },
      )
        .then((result) => {
          if (result.status === "ok") {
            result.handler();
          }
        })
        .then((data) => console.log("Message with a token", data))
        .catch((error) => console.log("Error handling", error));
    }
  }, []);

  return <div ref={buttonRef} style={{ width: "200px", height: "40px" }}></div>;
};
