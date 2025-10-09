declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Google Identity Services Types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdentityConfig) => void;
          renderButton: (
            element: HTMLElement,
            options: GoogleButtonConfig
          ) => void;
          prompt: (momentCallback?: (notification: PromptMomentNotification) => void) => void;
          disableAutoSelect: () => void;
          storeCredential: (credential: { id: string; password: string }) => void;
          cancel: () => void;
          onGoogleLibraryLoad: () => void;
          revoke: (hint: string, callback: (done: RevocationResponse) => void) => void;
        };
      };
    };
    YaAuthSuggest?: {
      init: (oauthQueryParams: OAuthQueryParams, tokenPageOrigin: string, config: YandexAuthConfig) => Promise<{status: 'ok'; handler: () => void} | {status: 'error'; code: string}>;
    };
  }
}

// Google Identity Services Configuration
interface GoogleIdentityConfig {
  /** Your application's client ID */
  client_id: string;
  /** Function called when credential is successfully retrieved */
  callback: (credentialResponse: CredentialResponse) => void;
  /** Whether to automatically select credentials */
  auto_select?: boolean;
  /** Whether to cancel the prompt if user clicks outside */
  cancel_on_tap_outside?: boolean;
  /** Context for the One Tap prompt */
  context?: 'signin' | 'signup' | 'use';
  /** Whether to use federated credential management */
  use_fedcm_for_prompt?: boolean;
  /** Intermediate iframe parent */
  intermediate_iframe_close_callback?: () => void;
  /** Allowed parent origins for iframe */
  allowed_parent_origin?: string | string[];
  /** Whether to log console messages */
  log_level?: 'debug' | 'info' | 'warn' | 'error';
}

// Google Button Configuration
interface GoogleButtonConfig {
  /** Button theme */
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  /** Button size */
  size?: 'large' | 'medium' | 'small';
  /** Button text */
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  /** Button shape */
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  /** Logo alignment */
  logo_alignment?: 'left' | 'center';
  /** Button width in pixels */
  width?: number;
  /** Custom locale */
  locale?: string;
  /** Click listener */
  click_listener?: () => void;
}

// Credential Response from Google
export interface GoogleCredentialResponse {
  /** The JWT credential token */
  credential: string;
  /** Method used to retrieve the credential */
  select_by?: 'auto' | 'user' | 'user_1tap' | 'user_2tap' | 'btn' | 'btn_confirm' | 'btn_add_session' | 'btn_confirm_add_session';
  /** Client ID */
  client_id?: string;
}

// Prompt Moment Notification
interface PromptMomentNotification {
  /** Whether the moment was displayed */
  isDisplayed: () => boolean;
  /** Whether the moment was not displayed */
  isNotDisplayed: () => boolean;
  /** Whether the moment was skipped */
  isSkippedMoment: () => boolean;
  /** Whether the moment was dismissed */
  isDismissedMoment: () => boolean;
  /** Get the moment type */
  getMomentType: () => 'display' | 'skipped' | 'dismissed';
  /** Get the dismiss reason */
  getDismissedReason: () => 'credential_returned' | 'cancel_called' | 'flow_restarted' | 'tap_outside' | 'issuer_mixed' | 'auto_cancel' | 'unknown_reason';
  /** Get the skipped reason */
  getSkippedReason: () => 'auto_cancel' | 'user_cancel' | 'tap_outside' | 'issuer_mixed' | 'unknown_reason';
}

// Revocation Response
interface RevocationResponse {
  /** Whether the revocation was successful */
  successful: boolean;
  /** Error message if revocation failed */
  error?: string;
}

interface OAuthQueryParams {
  /** Your application's client ID */
  client_id: string;
  /** Response type */
  response_type: 'code' | 'token';
  /** Redirect URI */
  redirect_uri?: string;
  /** Requested scopes */
  scope?: string;
  /** State parameter */
  state?: string;
  /** Force approval prompt */
  force_confirm?: boolean;
};

// Yandex Auth Suggest Configuration
interface YandexAuthConfig {
  /** Target element for the button */
  target: HTMLElement;
  /** OAuth query parameters */
  /** Button view type */
  view?: 'button' | 'link';
  /** Parent container ID */
  parentId?: string;
  /** Button size */
  buttonSize?: 's' | 'm' | 'l';
  /** Button view style */
  buttonView?: 'main' | 'additional' | 'extra';
  /** Button theme */
  buttonTheme?: 'light' | 'dark';
  /** Button border radius in pixels or CSS value */
  buttonBorderRadius?: string | number;
  /** Button icon type */
  buttonIcon?: 'ya' | 'custom';
  /** Custom button text */
  buttonText?: string;
  /** Callback function on success */
  onSuccess?: (data: YandexAuthSuccessData) => void;
  /** Callback function on error */
  onError?: (error: YandexAuthError) => void;
}

// Yandex Auth Success Data
interface YandexAuthSuccessData {
  /** Authorization code */
  code?: string;
  /** Access token */
  access_token?: string;
  /** Token type */
  token_type?: string;
  /** Token expiration time */
  expires_in?: number;
  /** State parameter */
  state?: string;
}

// Yandex Auth Error
interface YandexAuthError {
  /** Error type */
  error: 'access_denied' | 'invalid_request' | 'unauthorized_client' | 'unsupported_response_type' | 'invalid_scope' | 'server_error' | 'temporarily_unavailable';
  /** Error description */
  error_description?: string;
  /** State parameter */
  state?: string;
}

export {};