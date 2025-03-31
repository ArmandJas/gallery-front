import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {PhotoUploadRequest} from 'src/app/modules/gallery/models/photo-upload.request';
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
  protected readonly model = new PhotoUploadRequest();
}
