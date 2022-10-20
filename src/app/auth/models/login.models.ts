import { User } from './user.models';

export interface Login {
  data: {
    token: string;
    user: User;
  };
}

export interface LoginDto {
  data: {
    user: string;
    email: string;
    password: string;
  };
}

export interface LoginForm {
  email: string;
  password: string;
}
