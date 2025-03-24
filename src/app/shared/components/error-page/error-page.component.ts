import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [
    TranslatePipe
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
