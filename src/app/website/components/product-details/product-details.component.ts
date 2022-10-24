import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { ItemsCart } from '../../models/cart.models';
import { Product } from '../../models/product.models';
import { selectProductById } from '../../selectors/products.selectors';
import { Addlike } from '../../website.actions';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product$!: Observable<Product>;
  id!: string | null;
  unsusbscribe!: Subscription;

  productElement!: Product;
  quantityInput!: FormControl;
  quantityLimit!: string | undefined;

  disableLikeButton = false;

  constructor(private route: ActivatedRoute, private productStore: Store<Product[]>) {
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
          this.productElement = product;
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

  like() {
    if (this.productElement) {
      const product: Product = {
        ...this.productElement,
        likes_up_count: `${+this.productElement.likes_up_count + 1}`,
      };

      const update: Update<Product> = {
        id: product.id,
        changes: product,
      };

      this.productStore.dispatch(Addlike({ update }));
      this.disableLikeButton = true;
    }
  }

  ngOnDestroy(): void {
    this.unsusbscribe.unsubscribe();
  }
}
