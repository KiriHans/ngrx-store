import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.models';

@Injectable()
export class ProductsService {
  private readonly URL = 'https://trainee-program-api-staging.applaudostudios.com/api/v1';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<{ data: Product[] }>(`${URL}/products`).pipe(
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
}
