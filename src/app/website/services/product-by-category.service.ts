import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.models';
import { selectProductsByCategory } from '../selectors/products.selectors';

@Injectable()
export class ProductByCategoryService {
  productsByCategory$!: Observable<Product[]>;

  constructor(private store: Store<Product[]>) {}

  getProductsByCategory(category: string) {
    this.productsByCategory$ = this.store.select(selectProductsByCategory(category));
  }
}
