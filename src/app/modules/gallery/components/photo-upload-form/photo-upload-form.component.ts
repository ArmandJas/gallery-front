import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RegexConstants} from 'src/app/core/util/regex-constants';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {FormDataCreator} from 'src/app/shared/util/form-data-creator';
import {ImageValidatorDirective} from 'src/app/shared/validators/image-validator.directive';
import {PhotoUploadRequest} from '../../models/photo-upload.request';
import {PhotoService} from '../services/photo.service';
import {TagInputComponent} from '../tag-input/tag-input/tag-input.component';

@Component({
  selector: 'app-photo-upload-form',
  imports: [
    FormsModule,
    ImageValidatorDirective,
    TranslatePipe,
    TagInputComponent,
  ],
  templateUrl: './photo-upload-form.component.html',
  styleUrl: './photo-upload-form.component.scss'
})
export class PhotoUploadFormComponent {
  model = new PhotoUploadRequest();
  inputFilePathName: string | undefined;
  previewImageBase64: string | undefined;
  RegexConstants = RegexConstants;

  constructor(private photoService: PhotoService,
              private router: Router) {
  }

  uploadImage(event: any) {
    const reader = new FileReader();
    this.model.image = event.target.files[0];

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      if (reader.result != null) {
        this.previewImageBase64 = reader.result.toString();
      }
    };
    reader.onerror = function (error) {
      console.error('File reader error: ', error);
    };
  }

  protected updateTags(tags: string[]) {
    this.model.tags = tags;
  }

  submitForm(): void {
    const formData = FormDataCreator.createFormData(this.model);

    this.photoService.savePhoto(formData).subscribe({
      next: (model) => {
        this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + model.id]).then();
      },
      error: (err) => ErrorNavigator.navigateToErrorPage(this.router, err)
    });
  }
}
