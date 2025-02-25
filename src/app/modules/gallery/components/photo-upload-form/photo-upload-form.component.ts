import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {PHOTO_VIEW_PATH} from 'src/app/core/util/routing-constants';
import {PhotoDtoModel} from 'src/app/shared/models/photo-dto.model';
import {ImageValidatorDirective} from 'src/app/shared/validators/image-validator.directive';
import {PhotoService} from '../services/photo.service';

@Component({
  selector: 'app-photo-upload-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ImageValidatorDirective,
    TranslatePipe
  ],
  templateUrl: './photo-upload-form.component.html',
  styleUrl: './photo-upload-form.component.css'
})
export class PhotoUploadFormComponent {
  invalidForm: boolean;
  model = new PhotoDtoModel("", "", "", []);
  tagInput = "";
  inputFile = "";

  constructor(private photoService: PhotoService,
              private router: Router) {
    this.invalidForm = false;
  }

  uploadImage(event: any) {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      if (reader.result != null) {
        this.model.image = reader.result.toString();
      }
    };
    reader.onerror = function (error) {
      console.log('File reader error: ', error);
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
    this.photoService.postPhoto(this.model).subscribe(model =>
      this.router.navigate([PHOTO_VIEW_PATH + '/' + model.id])
    );
  }
}
