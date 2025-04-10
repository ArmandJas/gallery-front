import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {RegexConstants} from 'src/app/core/util/regex-constants';
import {FormDataCreator} from 'src/app/shared/util/form-data-creator';
import {ImageValidatorDirective} from 'src/app/shared/validators/image-validator.directive';
import {PhotoSaveRequest} from '../../models/photo-save-request';
import {TagInputComponent} from '../tag-input/tag-input/tag-input.component';

@Component({
  selector: 'app-photo-upload-form',
  imports: [
    FormsModule,
    TranslatePipe,
    TagInputComponent,
    ImageValidatorDirective,
  ],
  templateUrl: './photo-upload-form.component.html',
  styleUrl: './photo-upload-form.component.scss'
})
export class PhotoUploadFormComponent {
  @Input({required: true})
  model!: PhotoSaveRequest;

  @Input()
  withImageUpload: boolean = false;

  @Output()
  formSubmitted = new EventEmitter<FormData>();

  RegexConstants = RegexConstants;
  previewImageBase64: string | undefined;
  inputFilePathName: string | undefined;

  submitForm(): void {
    const formData = FormDataCreator.createFormData(this.model);
    this.formSubmitted.emit(formData);
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
}
