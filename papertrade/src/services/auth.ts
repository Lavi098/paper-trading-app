import api from './api';

type AuthResponse = {
  access_token: string;
};

type AuthCredentials = {
  email: string;
  password: string;
};

export const registerUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/auth/signup', credentials);
  return res.data;
};

export const loginUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/auth/login', credentials);
  return res.data;
};
