interface ReCaptchaV3 {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  var grecaptcha: { enterprise: ReCaptchaV3 };
}

export {};
