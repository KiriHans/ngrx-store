import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.models';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(value: Product[] | null, pageSize: number, pageNumber: number): Product[] | null {
    if (!value) return null;
    if (!value.length) return [];

    pageSize ||= 10;
    pageNumber ||= 1;

    return value.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }
}
