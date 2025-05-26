export interface IAuthService {
    login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: { email: string } }>;
    isAuthenticated(): boolean;
    logout(): void;
  }