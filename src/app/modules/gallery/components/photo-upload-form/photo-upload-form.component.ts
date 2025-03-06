import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RegexConstants} from 'src/app/core/util/regex-constants';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {ImageValidatorDirective} from 'src/app/shared/validators/image-validator.directive';
import {PhotoUploadRequest} from '../../models/photo-upload.request';
import {PhotoService} from '../services/photo.service';

@Component({
  selector: 'app-photo-upload-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ImageValidatorDirective,
    TranslatePipe,
  ],
  templateUrl: './photo-upload-form.component.html',
  styleUrl: './photo-upload-form.component.css'
})
export class PhotoUploadFormComponent {
  model = new PhotoUploadRequest();
  tagInput = "";
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

  addTag() {
    this.tagInput = this.tagInput.trim();
    const index = this.model.tags.indexOf(this.tagInput);
    if (index == -1) {
      this.model.tags.push(this.tagInput);
      this.tagInput = "";
    }
  }

  removeTag(tag: string) {
    tag = tag.trim();
    const index = this.model.tags.indexOf(tag);
    if (index > -1) {
      this.model.tags.splice(index, 1);
    }
  }

  submitForm(): void {
    const formData = new FormData();

    for (const [key, value] of Object.entries(this.model)) {
      if (value) {
        formData.append(key, value);
      }
    }

    this.photoService.savePhoto(formData).subscribe(model =>
      this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + model.id])
    );
  }
}
