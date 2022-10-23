import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { ItemsCart } from '../../models/cart.models';
import { Product } from '../../models/product.models';
import { selectProductById } from '../../selectors/products.selectors';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  id!: string | null;
  unsusbscribe!: Subscription;

  quantityInput!: FormControl;
  quantityLimit!: string | undefined;

  constructor(private route: ActivatedRoute, private cartRouter: Router, private productStore: Store<Product[]>, private itemStore: Store<ItemsCart[]>) {
    this.quantityInput = new FormControl(0, [Validators.pattern(/^[0-9]+$/)]);
  }

  ngOnInit(): void {
    this.unsusbscribe = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
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

  public get quantity(): FormControl {
    return this.quantityInput;
  }

  ngOnDestroy(): void {
    this.unsusbscribe.unsubscribe();
  }
}
