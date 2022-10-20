import { User } from './user.models';

export interface Login {
  token: string;
  user: User;
}

export interface LoginDto {
  user: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
