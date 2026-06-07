export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
}

export const AUTH_LOGIN_PATH = '/login';
export const AUTH_REGISTER_PATH = '/register';
export const AUTH_DEFAULT_REDIRECT = '/dashboard';
export const AUTH_RETURN_URL_QUERY_PARAM = 'returnUrl';
