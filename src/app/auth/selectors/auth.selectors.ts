import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user.models';
import { AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(selectAuthState, (auth) => {
  return !!auth.data?.user;
});

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => {
  return !loggedIn;
});

export const selectUserProfile = createSelector(selectAuthState, (auth) => {
  const userProfile = auth.data?.user;
  if (userProfile) {
    return userProfile;
  }
  return null;
});
