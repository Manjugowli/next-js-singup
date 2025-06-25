export enum EmailType {
    VERIFY = "verifyEmail",
    FORGOT_PASSWORD = "forgetpass",
  }
  
export const VERIFY_TOKEN_EXPIRY = 3600000; // 1 hour
export const FORGOT_PASSWORD_TOKEN_EXPIRY = 3600000; // 1 hour
  
  // Other unrelated constants
  export const MAX_LOGIN_ATTEMPTS = 5;
  export const SUPPORT_EMAIL = "manjugowli1234@gmail.com";
  