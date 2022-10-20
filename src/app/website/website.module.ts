import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { StoreModule } from '@ngrx/store';
import * as fromWebsite from './reducers';
import { CategoryScrollerComponent } from './components/category-scroller/category-scroller.component';

const COMPONENTS = [NavBarComponent, HomeComponent, ProductDetailsComponent];
const SERVICES = [CategoriesService, ProductsService];
@NgModule({
  providers: [...SERVICES],
  declarations: [WebsiteComponent, ...COMPONENTS, CategoryScrollerComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromWebsite.websiteFeatureKey, fromWebsite.categoryReducer, { metaReducers: fromWebsite.metaReducers }),
  ],
})
export class WebsiteModule {}
