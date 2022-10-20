import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category.models';

@Injectable()
export class CategoriesService {
  private readonly CATEGORIES_URL = 'https://trainee-program-api-staging.applaudostudios.com/api/v1';
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<{ data: Category[] }>(this.CATEGORIES_URL + '/categories').pipe(
      map((value) => {
        return value.data;
      }),
      catchError((error: Response) => {
        if (error.status == 401) {
          throw new Error('There are not categories');
        } else {
          console.log('error');
          throw new Error('Somenthing happened');
        }
      })
    );
  }
}
