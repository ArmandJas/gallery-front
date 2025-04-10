import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {marker} from '@colsen1991/ngx-translate-extract-marker'
import {TranslatePipe} from '@ngx-translate/core';

marker([
  'shared.error.400',
  'shared.error.404',
  'shared.error.500',
]);

@Component({
  selector: 'app-not-found',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  protected errorNumber: number;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.errorNumber = Number(this.route.snapshot.paramMap.get('errorNumber'));
  }
}
