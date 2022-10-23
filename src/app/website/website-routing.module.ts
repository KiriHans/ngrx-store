import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WebsiteComponent } from './components/website.component';
import { CartResolver } from './resolvers/cart.resolver';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { MetadataProductsResolver } from './resolvers/metadata-products.resolver';
import { ProductsResolver } from './resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    resolve: {
      categories: CategoriesResolver,
      products: ProductsResolver,
      metaProducts: MetadataProductsResolver,
    },
    children: [
      {
        path: 'cart/:idProduct/:quantity',
        component: CartComponent,
        canActivate: [AuthGuard],
        resolve: {
          cart: CartResolver,
        },
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
        resolve: {
          cart: CartResolver,
        },
      },
      {
        path: 'product/:id/:productName',
        component: ProductDetailsComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
