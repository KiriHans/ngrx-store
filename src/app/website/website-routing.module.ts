import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WebsiteComponent } from './components/website.component';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { ProductsResolver } from './resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    resolve: {
      categories: CategoriesResolver,
      products: ProductsResolver,
    },
    children: [
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
