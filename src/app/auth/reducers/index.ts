import { ActionReducer, ActionReducerMap, createFeatureSelector, createReducer, createSelector, MetaReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AuthActions } from '../action-types';
import { Login } from '../models/login.models';
import { User } from '../models/user.models';

export const authFeatureKey = 'auth';

export interface AuthState {
  data: Login | null;
}

export const initialAuthState: AuthState = {
  data: null,
};

export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      data: action.data,
    };
  })
);
