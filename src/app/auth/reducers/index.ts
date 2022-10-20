import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';

export const authFeatureKey = 'auth';

export interface AuthState {}

export const initialAuthState: AuthState = {};

export const reducers: ActionReducerMap<AuthState> = {};

export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
