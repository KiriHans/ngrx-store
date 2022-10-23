import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, ItemsCart } from '../../models/cart.models';
import { Product } from '../../models/product.models';
import { selectCart } from '../../selectors/cart.selectors';
import { selectProductById } from '../../selectors/products.selectors';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$!: Observable<ItemsCart[]>;
  product$!: Observable<Product>;

  constructor(private store: Store<ItemsCart[]>) {}

  ngOnInit(): void {
    this.cart$ = this.store.pipe(select(selectCart));
  }

  getProductByid(id: string | number): Observable<Product> {
    return this.store.pipe(select(selectProductById(id)));
  }
}
