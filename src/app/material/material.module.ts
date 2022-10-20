import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const MATERIAL_COMPONENTS = [
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatListModule,
];

@NgModule({
  imports: [CommonModule, MATERIAL_COMPONENTS],
  exports: [MATERIAL_COMPONENTS],
})
export class MaterialModule {}
