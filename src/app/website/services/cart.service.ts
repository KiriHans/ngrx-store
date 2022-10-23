import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Cart, CartDTO } from '../models/cart.models';

@Injectable()
export class CartService {
  private readonly CART_URL = 'https://trainee-program-api-staging.applaudostudios.com/api/v1';
  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get<{ data: Cart }>(`${this.CART_URL}/cart`).pipe(
      map((value) => {
        return value.data;
      }),
      catchError((error: Response) => {
        if (error.status == 401) {
          throw new Error('There is not a cart');
        } else {
          throw new Error('Somenthing happened');
        }
      })
    );
  }

  addItemCart(body: CartDTO) {
    return this.http.put<{ data: Cart }>(`${this.CART_URL}/cart`, body).pipe(
      map((value) => {
        return value.data;
      }),
      catchError((error: Response) => {
        if (error.status == 401) {
          throw new Error('We cannot add the item to the cart');
        } else {
          throw new Error('Somenthing happened');
        }
      })
    );
  }
}
