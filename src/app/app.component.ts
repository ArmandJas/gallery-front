import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HeaderComponent} from 'src/app/core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['_en', '_lt']);
    this.translate.setDefaultLang('_en');
    this.translate.use('_en');
  }
}
