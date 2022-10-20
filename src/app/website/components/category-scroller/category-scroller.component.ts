import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-scroller',
  templateUrl: './category-scroller.component.html',
  styleUrls: ['./category-scroller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryScrollerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
