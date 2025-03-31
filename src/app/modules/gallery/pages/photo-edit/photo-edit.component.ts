import {Component, model} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {PhotoUploadFormComponent} from 'src/app/modules/gallery/components/photo-upload-form/photo-upload-form.component';
import {PhotoService} from 'src/app/modules/gallery/components/services/photo.service';
import {PhotoDto} from 'src/app/modules/gallery/models/photo.dto';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {NumberValidator} from 'src/app/shared/util/number-validator';

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
  protected model = new PhotoDto();

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

    this.photoService.getPhotoById(id).subscribe({
      next: (photoDto) => {
        this.model = photoDto;
      },
      error: (err) => ErrorNavigator.navigateToErrorPage(this.router, err)
    });
  }
}
