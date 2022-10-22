import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthActions } from './action-types';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          localStorage.setItem('token', action.data.token);
          localStorage.setItem('user', JSON.stringify(action.data.user));
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logOut),
        tap(() => {
          localStorage.clear();
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
