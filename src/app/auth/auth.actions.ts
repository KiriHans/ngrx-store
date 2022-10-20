import { createAction, props } from '@ngrx/store';
import { Login } from './models/login.models';

export const login = createAction('[Login Page] User Login', props<Login>());
