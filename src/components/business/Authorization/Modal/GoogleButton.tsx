import { GoogleCredentialResponse } from "@/types";
import { useEffect, useRef } from "react";

function handleCredentialResponse(response: GoogleCredentialResponse) {
  const idToken = response.credential;
  console.log("Received ID Token:", idToken);
}

export const GoogleSignInButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && buttonRef.current) {
      console.log("google", window.google);
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });

      // window.google.accounts.id.setLogLevel("info");
    }
  }, []);

  return (
    <div>
      <div ref={buttonRef} className="google-sign-in-button-container"></div>
    </div>
  );
};
