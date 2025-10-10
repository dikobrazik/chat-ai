import { AUTH_REDIRECT_URI, BASE_URL } from "@/config";
import React, { useEffect, useRef } from "react";

export const YandexSignInButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.YaAuthSuggest && buttonRef.current) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID!,
          response_type: "code",
          redirect_uri: `${AUTH_REDIRECT_URI}/ya`,
        },
        BASE_URL!,
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
        .catch(console.error);
    }
  }, []);

  return (
    <div id="buttonContainerId">
      <div ref={buttonRef} style={{ width: "200px", height: "40px" }}></div>
    </div>
  );
};
