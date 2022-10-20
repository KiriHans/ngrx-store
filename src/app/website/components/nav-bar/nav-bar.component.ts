import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'website-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
