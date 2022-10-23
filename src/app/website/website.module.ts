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
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataProductsResolver } from './resolvers/metadata-products.resolver';
import { PaginatePipe } from './pipes/paginate.pipe';
import { MetadataProductsService } from './services/metadata-products.service';
import { ProductByCategoryService } from './services/product-by-category.service';
import { CartComponent } from './components/cart/cart.component';
import { CartResolver } from './resolvers/cart.resolver';
import { CartService } from './services/cart.service';

const COMPONENTS = [NavBarComponent, HomeComponent, ProductDetailsComponent, ProductCardComponent, ProductListComponent, CartComponent];
const SERVICES = [CategoriesService, ProductsService, MetadataProductsService, ProductByCategoryService, CartService];
const RESOLVERS = [CategoriesResolver, ProductsResolver, MetadataProductsResolver, CartResolver];
const PIPES = [PaginatePipe];

@NgModule({
  providers: [...SERVICES, ...RESOLVERS],
  declarations: [WebsiteComponent, ...COMPONENTS, ...PIPES],
  imports: [CommonModule, WebsiteRoutingModule, MaterialModule, ReactiveFormsModule, SharedModule, EffectsModule.forFeature([WebsiteEffects])],
})
export class WebsiteModule {}
