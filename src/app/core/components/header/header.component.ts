import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {PHOTO_LIST_PATH, PHOTO_UPLOAD_PATH} from 'src/app/core/util/routing-constants';

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

  constructor(private translate: TranslateService) {
  }

  changeLanguage() {
    this.translate.use(this.language);
  }

  protected readonly PHOTO_UPLOAD_PATH = PHOTO_UPLOAD_PATH;
  protected readonly PHOTO_LIST_PATH = PHOTO_LIST_PATH;
}
