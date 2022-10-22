import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  constructor(private snackbar: MatSnackBar) {}
  handleError(error: unknown): void {
    if (error instanceof Response && error.status == 401) {
      this.snackbar.open('The username/password is invalid', 'close', {
        duration: 2000,
      });
    } else {
      console.error(error);

      this.snackbar.open('Error was detected! We are working on it!', 'close', {
        duration: 2000,
      });
    }
  }
}
