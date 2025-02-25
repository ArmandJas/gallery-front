import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {ImagePlaceholderDirective} from 'src/app/shared/directives/image-placeholder.directive';
import {PhotoDtoModel} from 'src/app/shared/models/photo-dto.model';
import {PhotoService} from '../../components/services/photo.service';

@Component({
  selector: 'app-photo-view',
  imports: [ReactiveFormsModule, ImagePlaceholderDirective, TranslatePipe],
  templateUrl: './photo-view.component.html',
  styleUrl: './photo-view.component.css'
})
export class PhotoViewComponent {
  photoDto = new PhotoDtoModel("Loading...", "", "", []);

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getPhoto();
  }

  public getPhoto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.photoService.getPhoto(id).subscribe({
      next: (photoDto) => this.photoDto = photoDto,
      error: (err) => this.router.navigate(['/404'])
    });
  }
}
