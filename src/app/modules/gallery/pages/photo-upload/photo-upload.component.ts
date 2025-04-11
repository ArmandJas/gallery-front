import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {PhotoSaveRequest} from 'src/app/modules/gallery/models/photo-save-request';
import {PhotoService} from 'src/app/modules/gallery/services/photo.service';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {PhotoUploadFormComponent} from '../../components/photo-upload-form/photo-upload-form.component';

@Component({
  selector: 'app-photo-upload',
  imports: [
    FormsModule,
    PhotoUploadFormComponent,
    TranslatePipe,
  ],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.scss'
})
export class PhotoUploadComponent {
  protected model = new PhotoSaveRequest();

  constructor(
    private photoService: PhotoService,
    private router: Router,
  ) {
  }

  protected onFormSubmitted(formData: FormData) {
    this.photoService.save(formData).subscribe({
      next: (model) => {
        this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + model.id]).then();
      },
      error: (err) => ErrorNavigator.navigateToErrorPage(this.router, err)
    });
  }
}
