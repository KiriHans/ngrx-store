import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
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
  item$!: Observable<ItemsCart>;
  unsusbscribe!: Subscription;

  product$!: Observable<Product>;

  quantityInput!: FormControl;

  id!: string | null;
  quantity!: string | null;
  quantityLimit!: string | undefined;

  constructor(private cartStore: Store<ItemsCart[]>, private productStore: Store<Product[]>, private route: ActivatedRoute) {
    this.quantityInput = new FormControl(0, [Validators.pattern(/^[0-9]+$/)]);
  }

  ngOnInit(): void {
    this.cart$ = this.cartStore.pipe(
      select(selectCart),
      tap((data) => {
        console.log(data);
      })
    );

    this.unsusbscribe = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('idProduct');
        this.quantity = params.get('quantity');
      },
    });

    if (this.id) {
      this.product$ = this.productStore.pipe(
        select(selectProductById(this.id)),
        tap((product) => {
          this.quantityLimit = product.master?.stock;
          if (this.quantityLimit) {
            this.quantityInput.addValidators(Validators.max(+this.quantityLimit));
          } else {
            this.quantityInput.addValidators(Validators.max(0));
          }
        })
      );
    }
  }

  getProductByid(id: string | number): Observable<Product> {
    return this.productStore.pipe(select(selectProductById(id)));
  }
}
