import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [WebsiteComponent, NavBarComponent, HomeComponent, ProductDetailsComponent],
  imports: [CommonModule, WebsiteRoutingModule, MaterialModule],
})
export class WebsiteModule {}
