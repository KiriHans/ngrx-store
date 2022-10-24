import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Cart, ItemsCart, CartDTO } from '../../models/cart.models';
import { Product } from '../../models/product.models';
import { selectCart, selectItemById, selectItemIds } from '../../selectors/cart.selectors';
import { selectProductById } from '../../selectors/products.selectors';
import { addProductCart, upsertItem } from '../../website.actions';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart$!: Observable<ItemsCart[]>;

  item!: ItemsCart;
  unsusbscribe = new Subject();

  productChanging!: Product;

  quantityInput!: FormControl;

  id!: string | null;
  quantity!: string | null;
  quantityLimit!: string | undefined;

  constructor(private cartStore: Store<ItemsCart[]>, private productStore: Store<Product[]>, private route: ActivatedRoute) {
    this.quantityInput = new FormControl(0, [Validators.pattern(/^[0-9]+$/), Validators.min(1)]);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.unsusbscribe)).subscribe({
      next: (params) => {
        this.id = params.get('idProduct');
        this.quantity = params.get('quantity');
      },
    });

    if (this.id) {
      this.productStore
        .pipe(
          takeUntil(this.unsusbscribe),
          select(selectProductById(this.id)),
          tap((product) => {
            this.quantityLimit = product.master?.stock;
            this.productChanging = product;
          })
        )
        .subscribe();
      this.cartStore.pipe(takeUntil(this.unsusbscribe), select(selectItemById(this.id))).subscribe({
        next: (item) => {
          if (this.quantity) {
            this.item = this.onReload(item, this.quantity);
          }
        },
      });
    }
    if (this.id) {
      this.cartStore.dispatch(upsertItem({ item: this.item }));
    }

    this.cart$ = this.cartStore.pipe(select(selectCart));
  }

  onReload(itemCart: ItemsCart, quantity: string): ItemsCart {
    const price = this.productChanging.master?.price as string;
    const promotion = +(this.productChanging.master?.promotional_price as string) === 0 ? '0' : '1';
    let item: ItemsCart;

    if (typeof itemCart === 'undefined' && this.id && this.quantity) {
      item = {
        id: this.id,
        quantity: this.quantity,
        product_variant_id: this.id,
        product_id: this.id,
        order_id: this.id,
        total: `${+this.quantity * +price}`,
        price,
        name: this.productChanging.name,
        description: this.productChanging.description,
        promotion,
      };
    } else {
      const newQuantity = +itemCart.quantity + +quantity;
      const total = newQuantity * +itemCart.price;
      item = {
        ...itemCart,
        quantity: `${newQuantity}`,
        total: `${total}`,
      };
    }
    return item;
  }

  ngOnDestroy(): void {
    this.unsusbscribe.next(null);
    this.unsusbscribe.complete();
  }
}
