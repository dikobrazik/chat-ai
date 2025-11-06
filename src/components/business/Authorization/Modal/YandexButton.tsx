import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { BASE_URL } from "@/config";

export const YandexSignInButton = () => {
  return (
    <div>
      <Button
        as="a"
        variant="outline"
        size="sm"
        fullWidth
        leftIcon={<Icon name="yandex" />}
        href={`${BASE_URL}/api/auth/ya`}
      >
        Yandex
      </Button>
    </div>
  );

  // const buttonRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (window.YaAuthSuggest && buttonRef.current) {
  //     window.YaAuthSuggest.init(
  //       {
  //         client_id: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID!,
  //         response_type: "code",
  //         redirect_uri: `${AUTH_REDIRECT_URI}/ya`,
  //       },
  //       BASE_URL!,
  //       {
  //         target: buttonRef.current,
  //         view: "button",
  //         parentId: "buttonContainerId",
  //         buttonSize: "m",
  //         buttonView: "main",
  //         buttonTheme: "light",
  //         buttonBorderRadius: "0",
  //         buttonIcon: "ya",
  //       },
  //     )
  //       .then((result) => {
  //         if (result.status === "ok") {
  //           result.handler();
  //         }
  //       })
  //       .catch(console.error);
  //   }
  // }, []);

  // return (
  //   <div id="buttonContainerId">
  //     <div ref={buttonRef} style={{ width: "200px", height: "40px" }}></div>
  //   </div>
  // );
};
