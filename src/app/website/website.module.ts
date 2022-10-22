import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { MaterialModule } from '../material/material.module';

import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { StoreModule } from '@ngrx/store';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { EffectsModule } from '@ngrx/effects';
import { WebsiteEffects } from './website.effects';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { productReducer } from './reducers/product.reducer';
import { categoryReducer } from './reducers/category.reducer';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { WebsiteComponent } from './components/website.component';
import { ToastrModule } from 'ngx-toastr';

const COMPONENTS = [NavBarComponent, HomeComponent, ProductDetailsComponent, ProductCardComponent, ProductListComponent];
const SERVICES = [CategoriesService, ProductsService];
const RESOLVERS = [CategoriesResolver, ProductsResolver];

@NgModule({
  providers: [...SERVICES, ...RESOLVERS],
  declarations: [WebsiteComponent, ...COMPONENTS],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MaterialModule,

    SharedModule,
    StoreModule.forFeature('category', categoryReducer),
    StoreModule.forFeature('product', productReducer),
    EffectsModule.forFeature([WebsiteEffects]),
  ],
})
export class WebsiteModule {}
