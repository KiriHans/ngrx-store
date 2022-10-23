import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { MetadataProducts } from '../models/metadata-products.models';

@Injectable({
  providedIn: 'root',
})
export class MetadataProductsService {
  private readonly META_URL = 'https://trainee-program-api-staging.applaudostudios.com/api/v1';

  constructor(private http: HttpClient) {}

  getMetadata() {
    return this.http.get<{ meta: MetadataProducts }>(`${this.META_URL}/products`, { params: this.getParameters() }).pipe(
      map((value) => {
        return value.meta;
      })
    );
  }

  private getParameters() {
    return new HttpParams().append('page[size]', 42);
  }
}
