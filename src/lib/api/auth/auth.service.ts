import { api } from '../client';
import { User } from '../user/user.type';

const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User; expiresIn: number }>(
    'auth/login',
    input,
  );

export const authService = { login };
