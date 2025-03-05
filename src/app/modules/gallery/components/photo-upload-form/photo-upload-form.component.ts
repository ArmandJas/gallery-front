import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RegexConstants} from 'src/app/core/util/regex-constants';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {PhotoUploadDtoModel} from 'src/app/shared/models/photo-upload-dto.model';
import {ImageValidatorDirective} from 'src/app/shared/validators/image-validator.directive';
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
  model = new PhotoUploadDtoModel();
  tagInput = "";
  inputFile = "";
  imagePreview = "";
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
        this.imagePreview = reader.result.toString();
      }
    };
    reader.onerror = function (error) {
      console.error('File reader error: ', error);
    };
  }

  addTag(event: any) {
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
    formData.append('name', this.model.name);
    if (this.model.description) {
      formData.append('description', this.model.description);
    }
    formData.append('tags', this.model.tags.toString());
    formData.append('image', this.model.image);

    this.photoService.savePhoto(formData).subscribe(model =>
      this.router.navigate([RoutingConstants.PHOTO_VIEW_PATH + '/' + model.id])
    );
  }
}
