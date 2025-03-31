import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';
import {PhotoDto} from '../../models/photo.dto';

@Component({
  selector: 'app-photo-list-item',
  imports: [
    ImagePlaceholderDirective
  ],
  templateUrl: './photo-list-item.component.html',
  styleUrl: './photo-list-item.component.scss'
})
export class PhotoListItemComponent {
  @Input({required: true}) photo: PhotoDto = new PhotoDto();

  constructor(private router: Router) {
  }

  navigate() {
    if (this.photo) {
      this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + this.photo.id]).then();
    }
  }
}
