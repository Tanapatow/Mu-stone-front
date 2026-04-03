import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    expiresIn?: number;
    role?: 'USER' | 'ADMIN';
    email: string;
  }

  interface Session {
    user: {
      id?: string;
      firstName?: string;
      lastName?: string;
      accessToken?: string;
      role?: 'USER' | 'ADMIN';
      email: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    accessTokenExpiresAt?: number;
    role?: 'USER' | 'ADMIN';
    email: string;
  }
}
