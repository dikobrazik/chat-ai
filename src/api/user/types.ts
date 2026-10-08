export type Profile = {
  id: string;
  email: string;
  name: string | null;
  mailing_consent: boolean;
  photo: string;
  status: string;
  created_at: string;
};

export type UpdateProfilePayload =
  | { name: string; mailing_consent?: never }
  | { name?: never; mailing_consent: boolean };
