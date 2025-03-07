import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';
import {PhotoService} from '../../components/services/photo.service';
import {PhotoDto} from '../../models/photo.dto';

@Component({
  selector: 'app-photo-view',
  imports: [ReactiveFormsModule, ImagePlaceholderDirective, TranslatePipe],
  templateUrl: './photo-view.component.html',
  styleUrl: './photo-view.component.css'
})
export class PhotoViewComponent {
  photoDto = new PhotoDto("Loading...");

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
  ) {
    this.loadPhoto();
  }

  private loadPhoto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id || id < 0) {
      this.navigateToNotFound();
      return;
    }

    this.photoService.getPhotoById(id).subscribe({
      next: (photoDto) => {
        this.photoDto = photoDto;
      },
      error: () => this.navigateToNotFound()
    });

  }

  private navigateToNotFound(): void {
    this.router.navigate(['/404']);
  }
}
