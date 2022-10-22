import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.models';
import { selectAllProducts } from '../../selectors/products.selectors';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList$!: Observable<Product[]>;

  constructor(private store: Store<Product[]>) {}

  ngOnInit(): void {
    this.productList$ = this.store.pipe(select(selectAllProducts));
  }
}
