import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [WebsiteComponent, NavBarComponent, HomeComponent, ProductDetailsComponent],
  imports: [CommonModule, WebsiteRoutingModule, MaterialModule],
})
export class WebsiteModule {}
