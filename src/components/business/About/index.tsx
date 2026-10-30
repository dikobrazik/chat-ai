import {
  COOKIE_CONSENT,
  MAILING_CONSENT,
  PERSONAL_DATA_CONSENT,
  PRIVACY_POLICY,
  TERMS,
} from "@/components/business/Legal/constants";
import { Divider } from "@/components/ui/Divider";
import { Text } from "@/components/ui/Text";
import { DocumentRow } from "./components/DocumentRow";

export const About = () => {
  return (
    <div className="flex flex-col gap-6">
      <DocumentRow
        title="Условия использования"
        href="/terms"
        edition={TERMS.edition}
      />

      <Divider />

      <DocumentRow
        title="Политика конфиденциальности"
        href="/privacy"
        edition={PRIVACY_POLICY.edition}
      />

      <Divider />

      <DocumentRow
        title="Согласие на обработку персональных данных"
        href="/personal-data-consent"
        edition={PERSONAL_DATA_CONSENT.edition}
      />

      <Divider />

      <DocumentRow
        title="Согласие на рассылку"
        href="/mailing-consent"
        edition={MAILING_CONSENT.edition}
      />

      <Divider />

      <DocumentRow
        title="Согласие на cookie"
        href="/cookie-consent"
        edition={COOKIE_CONSENT.edition}
      />

      <Divider />

      <div className="flex flex-col gap-1">
        <Text type="xs" color="#6F6F6F" style="regular">
          Email
        </Text>

        <Text type="s" style="regular">
          support@jonu.ru
        </Text>
      </div>
    </div>
  );
};
