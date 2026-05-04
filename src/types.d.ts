declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

export interface IframeIntegrationConfig {
  /**
   * Срабатывает после загрузки платежной формы (перед отображением)
   * Может быть использован для отображения loader в контейнере
   */
  loadedCallback?: () => void;
  router?: {
    /**
     * Вызывается в момент получения события на открытие deepLink
     * Стандартное значение: (url) => {window.location.href = url}
     * @param url
     */
    deepLinkRedirectCallback?: (url: string) => Promise<void>;
    /**
     * Вызывается в момент получения события на открытие массива deepLink.
     * Требуется для перебора разных приложений, например для sberpay
     * Стандартное значение: (links, script) => {
     *  window.location.href = script;
     * }
     * @param links - массив deepLink
     * @param script - url скрипта перебора deepLink
     */
    deepLinksRedirectCallback?: (
      links: string[],
      script: string,
    ) => Promise<void>;
    /**
     * Вызывается в момент получения события на редирект
     * Стандартное значение: (url) => {window.location.href = url}
     * @param url
     */
    redirectCallback?: (url: string) => Promise<void>;
  };
  language?: {
    /**
     * Вызывается в момент изменения языка из платежной формы
     * @param status
     */
    changedCallback?: (lang: IntegrationLang) => Promise<void>;
  };
  status?: {
    /**
     * Вызывается в момент изменения статуса платежа
     * @param status
     */
    changedCallback?: (status: PaymentIntegrationStatus) => Promise<void>;
  };
}

interface PaymentIntegration {
  init(config: {
    terminalKey: string;
    product: string;
    features: {
      payment?: {
        container: HTMLElement;
        config?: object;
        paymentStartCallback?: (paymentType: string) => Promise<string>;
      };
      iframe?: {
        container: HTMLElement;
        config?: IframeIntegrationConfig;
        paymentStartCallback?: (paymentType: string) => Promise<string>;
      };
      addcard?: {
        container: HTMLElement;
        config?: object;
        paymentStartCallback?: () => Promise<string>;
      };
    };
  }): Promise<Integration>;
}

declare global {
  interface Window {
    PaymentIntegration: PaymentIntegration;
  }
}
