import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers, { metaReducers: fromAuth.metaReducers }),
  ],
})
export class AuthModule {}
