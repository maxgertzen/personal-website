interface ReCaptchaV2 {
  render(
    container: string | HTMLElement,
    parameters: ReCaptchaV2.Parameters
  ): number;
  reset(widgetId?: number): void;
  getResponse(widgetId?: number): string;
  execute(widgetId?: number, parameters?: { action: string }): Promise<string>;
}

interface ReCaptchaV3 {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  var grecaptcha: ReCaptchaV2 & ReCaptchaV3;
}

export {};
