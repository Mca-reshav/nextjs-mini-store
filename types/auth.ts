export type User = {
  name: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
};