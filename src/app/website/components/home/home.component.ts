import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MetadataProducts } from '../../models/metadata-products.models';
import { Product } from '../../models/product.models';
import { selectMetadataProducts } from '../../selectors/metadata-products.selectors';
import { selectAllProducts } from '../../selectors/products.selectors';
import { ProductByCategoryService } from '../../services/product-by-category.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList$!: Observable<Product[]>;
  meta$!: Observable<MetadataProducts | null>;
  productsByCategory$!: Observable<Product[]>;

  pageSize = 10;
  pageNumber = 1;

  pageEvent!: PageEvent;

  constructor(private store: Store<Product[]>, private productByCategoryService: ProductByCategoryService, private router: Router) {}

  ngOnInit(): void {
    this.productList$ = this.store.pipe(select(selectAllProducts));
    this.meta$ = this.store.pipe(select(selectMetadataProducts));
    this.productsByCategory$ = this.productByCategoryService.productsByCategory$;
  }

  handlePagination(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
  }

  getProduct(product: Product) {
    this.router.navigateByUrl('/product');
  }
}
