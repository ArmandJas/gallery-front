import {Attribute, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {PHOTO_VIEW_PATH} from 'src/app/core/util/routing-constants';
import {PhotoService} from 'src/app/modules/gallery/components/services/photo.service';
import {PhotoListComponent} from 'src/app/modules/gallery/pages/photo-list/photo-list.component';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';
import {PhotoDtoModel} from 'src/app/shared/models/photo-dto.model';

@Component({
  selector: 'app-photo-list-item',
  imports: [
    ImagePlaceholderDirective
  ],
  templateUrl: './photo-list-item.component.html',
  styleUrl: './photo-list-item.component.css'
})
export class PhotoListItemComponent {
  @Input({required: true}) photo !: PhotoDtoModel;

  constructor(private router: Router) {
  }

  navigate(){
    this.router.navigate([PHOTO_VIEW_PATH + '/' + this.photo.id]);
  }
}
