import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {PhotoUploadFormComponent} from 'src/app/modules/gallery/components/photo-upload-form/photo-upload-form.component';
import {PhotoResponse} from 'src/app/modules/gallery/models/photo.response';
import {PhotoService} from 'src/app/modules/gallery/services/photo.service';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {NumberValidator} from 'src/app/shared/util/number-validator';
import {PhotoSaveRequest} from '../../models/photo-save-request';

@Component({
  selector: 'app-photo-edit',
  imports: [
    PhotoUploadFormComponent,
    TranslatePipe
  ],
  templateUrl: './photo-edit.component.html',
  styleUrl: './photo-edit.component.scss'
})
export class PhotoEditComponent {
  protected model = new PhotoSaveRequest();
  protected modelLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
  ) {
    this.loadPhoto();
  }

  private loadPhoto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!NumberValidator.isPositiveNumber(id)) {
      ErrorNavigator.navigateToErrorPage(this.router);
      return;
    }

    this.photoService.get(id).subscribe({
      next: (photoDto: PhotoResponse) => {
        this.model = this.model.to(photoDto);
        this.modelLoaded = true;
      },
      error: (err: any) => ErrorNavigator.navigateToErrorPage(this.router, err)
    });
  }

  protected onFormSubmitted(formData: FormData) {
    this.photoService.edit(formData).subscribe({
      next: (model) => {
        this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + model.id]).then();
      },
      error: (err) => ErrorNavigator.navigateToErrorPage(this.router, err)
    });
  }
}
