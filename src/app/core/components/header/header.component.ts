import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {RoutingConstants} from 'src/app/core/util/routing-constants';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'MyGallery™';
  language = '_en';
  routingConstants = RoutingConstants;

  constructor(private translateService: TranslateService) {
  }

  changeLanguage() {
    this.translateService.use(this.language);
  }
}
