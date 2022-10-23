import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ItemsCart } from '../../models/cart.models';
import { Product } from '../../models/product.models';
import { selectProductById } from '../../selectors/products.selectors';
import { addProductCart } from '../../website.actions';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  id!: string | null;
  unsusbscribe!: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<Product[]>) {}

  ngOnInit(): void {
    this.unsusbscribe = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });
    if (this.id) {
      this.product$ = this.store.pipe(select(selectProductById(this.id)));
    }
  }

  addItemCart() {
    // let item: ItemsCart
    // const product = this.product$.subscribe(
    //   {
    //     next: (prod) => {
    //     }
    //   }
    // )
    // this.store.dispatch(addProductCart(selectProductById(this.id)));
  }

  ngOnDestroy(): void {
    this.unsusbscribe.unsubscribe();
  }
}
