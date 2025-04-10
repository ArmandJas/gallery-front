import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {PhotoResponse} from 'src/app/modules/gallery/models/photo.response';
import {PhotoService} from 'src/app/modules/gallery/services/photo.service';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';

@Component({
  selector: 'app-photo-list-item',
  imports: [
    ImagePlaceholderDirective
  ],
  templateUrl: './photo-list-item.component.html',
  styleUrl: './photo-list-item.component.scss'
})
export class PhotoListItemComponent implements OnInit {
  @Input({required: true})
  photo = new PhotoResponse();

  protected imageSrc: string = "";

  constructor(private router: Router,
              private photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.getThumbnail(this.photo.id).subscribe(blob => {
      this.imageSrc = URL.createObjectURL(blob);
    });
  }

  navigate() {
    if (this.photo) {
      this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + this.photo.id]).then();
    }
  }
}
