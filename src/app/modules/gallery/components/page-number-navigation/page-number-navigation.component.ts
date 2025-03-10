import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from 'src/app/modules/gallery/components/services/photo.service';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';

@Component({
  selector: 'app-page-number-navigation',
  imports: [
    ImagePlaceholderDirective
  ],
  templateUrl: './page-number-navigation.component.html',
  styleUrl: './page-number-navigation.component.css'
})
export class PageNumberNavigationComponent {
  pageNumber !: number;
//TODO: links not working, positioning of component
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(){
    this.pageNumber = Number(this.route.snapshot.paramMap.get('id'));
  }


  navigateBack(){
    this.router.navigate([this.route.snapshot.url[1]]);
  }
  navigateForward() {

  }
}
