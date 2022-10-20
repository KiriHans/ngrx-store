import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { login } from '../../auth.actions';
import { Login, LoginDto, LoginForm } from '../../models/login.models';
import { AuthState } from '../../reducers';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLogin!: boolean;
  constructor(private auth: AuthService, private fb: FormBuilder, private store: Store<AuthState>, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  login(formData: LoginForm) {
    const credentials: LoginDto = {
      data: {
        user: formData.email,
        email: formData.email,
        password: formData.password,
      },
    };
    this.auth.login(credentials).pipe(
      tap({
        next: (user) => {
          this.store.dispatch(login(user));
          this.router.navigateByUrl('/');
        },
      })
    );
  }
}
