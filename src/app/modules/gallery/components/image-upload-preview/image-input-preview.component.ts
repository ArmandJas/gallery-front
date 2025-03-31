import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {ImageValidatorDirective} from 'src/app/shared/validators/image-validator.directive';

@Component({
  selector: 'app-image-input-preview',
  imports: [TranslatePipe, ImageValidatorDirective, FormsModule],
  templateUrl: './image-input-preview.component.html',
  styleUrl: './image-input-preview.component.scss'
})
export class ImageInputPreviewComponent {
  @Output() imageUpload = new EventEmitter<File>();
  inputFilePathName: string | undefined;
  previewImageBase64: string | undefined;
  imageFile: File | undefined;

  uploadImage(event: any) {
    const reader = new FileReader();
    this.imageFile = event.target.files[0];
    this.imageUpload.emit(this.imageFile);

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
