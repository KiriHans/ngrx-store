import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from '../core/services/notification.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [NotificationService],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer, { metaReducers: fromAuth.metaReducers }),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
