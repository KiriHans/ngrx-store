import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Category } from '../../models/category.models';
import { CategoriesService } from '../../services/categories.service';
import { category } from '../../website.actions';

@Component({
  selector: 'website-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  categoryList$!: Observable<Category[]>;
  constructor(private categoresService: CategoriesService, private store: Store<Category[]>) {}

  ngOnInit(): void {
    this.categoryList$ = this.categoresService.getCategories().pipe(
      tap({
        next: (categories) => {
          this.store.dispatch(category({ categoryList: categories }));
        },
      })
    );
  }
}
