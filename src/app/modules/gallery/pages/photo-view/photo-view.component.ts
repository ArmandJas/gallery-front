import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {NumberValidator} from 'src/app/shared/util/number-validator';
import {PhotoService} from '../../services/photo.service';
import {PhotoDto} from '../../models/photo.dto';

@Component({
  selector: 'app-photo-view',
  imports: [ReactiveFormsModule, ImagePlaceholderDirective, TranslatePipe],
  templateUrl: './photo-view.component.html',
  styleUrl: './photo-view.component.scss'
})
export class PhotoViewComponent {
  photoDto = new PhotoDto("Loading...");
    private photoId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
  ) {
    this.loadPhoto();
  }

  private loadPhoto(): void {
    this.photoId = Number(this.route.snapshot.paramMap.get('id'));
    if (!NumberValidator.isPositiveNumber(this.photoId)) {
      ErrorNavigator.navigateToErrorPage(this.router);
      return;
    }

    this.photoService.getPhotoById(this.photoId).subscribe({
      next: (photoDto) => {
        this.photoDto = photoDto;
      },
      error: (err) => ErrorNavigator.navigateToErrorPage(this.router, err)
    });
  }

  protected deletePhoto() {
    this.photoService.deletePhotoById(this.photoDto.id);
    this.router.navigate([RoutingConstants.PHOTO_UPLOAD_PATH]).then();
  }
  protected editPhoto() {
    this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH +  '/' + this.photoId + '/edit']).then();
  }
}
