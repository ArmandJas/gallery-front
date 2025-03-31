import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RegexConstants} from 'src/app/core/util/regex-constants';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {ImageInputPreviewComponent} from 'src/app/modules/gallery/components/image-upload-preview/image-input-preview.component';
import {PhotoDto} from 'src/app/modules/gallery/models/photo.dto';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {FormDataCreator} from 'src/app/shared/util/form-data-creator';
import {PhotoUploadRequest} from '../../models/photo-upload.request';
import {PhotoService} from '../../services/photo.service';
import {TagInputComponent} from '../tag-input/tag-input/tag-input.component';

@Component({
  selector: 'app-photo-upload-form',
  imports: [
    FormsModule,
    TranslatePipe,
    TagInputComponent,
    ImageInputPreviewComponent,
  ],
  templateUrl: './photo-upload-form.component.html',
  styleUrl: './photo-upload-form.component.scss'
})
export class PhotoUploadFormComponent {
  @Input({required: true})
  model: any;
//  model = new PhotoUploadRequest();
  RegexConstants = RegexConstants;

  constructor(private photoService: PhotoService,
              private router: Router) {
    if(this.model){
      this.updateTags(this.model.tags);
    }
  }
  //TODO: decouple/make extra version of form for edit photo.
  protected updateImageFile(file: File) {
    this.model.image = file;
  }

  protected updateTags(tags: string[]) {
    console.log(this.model.tags);
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
