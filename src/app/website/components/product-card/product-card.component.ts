import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.models';
import { Addlike } from '../../website.actions';

@Component({
  selector: 'website-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | null = null;

  disableLikeButton = false;
  constructor(private store: Store<Product>) {}

  ngOnInit(): void {}

  like() {
    if (this.product) {
      const product: Product = {
        ...this.product,
        likes_up_count: `${+this.product.likes_up_count + 1}`,
      };

      const update: Update<Product> = {
        id: product.id,
        changes: product,
      };

      this.store.dispatch(Addlike({ update }));
      this.disableLikeButton = true;
    }
  }
}
