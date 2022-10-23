import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.models';
import { selectProductsByCategory } from '../selectors/products.selectors';

@Injectable()
export class ProductsService {
  private readonly PRODUCT_URL = 'https://trainee-program-api-staging.applaudostudios.com/api/v1';
  private readonly defaultPageNumber = 1;
  private readonly defaultPageSize = 0;

  constructor(private http: HttpClient, private store: Store<Product[]>) {}

  getProducts(pageNumber = this.defaultPageNumber, pageSize = this.defaultPageSize) {
    return this.http
      .get<{ data: Product[] }>(`${this.PRODUCT_URL}/products?include=image_attachment.blob,category,master`, { params: this.getParameters(pageNumber, pageSize) })
      .pipe(
        map((value) => {
          return value.data;
        }),
        catchError((error: Response) => {
          if (error.status == 401) {
            throw new Error('There are not products');
          } else {
            throw new Error('Somenthing happened');
          }
        })
      );
  }

  private getParameters(pageNumber = this.defaultPageNumber, pageSize = this.defaultPageSize) {
    return new HttpParams().append('page[size]', pageSize).append('page[number]', pageNumber);
  }
}
