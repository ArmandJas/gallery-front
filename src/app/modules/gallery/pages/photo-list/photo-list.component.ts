import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageNumberNavigationComponent} from 'src/app/modules/gallery/components/page-number-navigation/page-number-navigation.component';
import {PhotoListItemComponent} from 'src/app/modules/gallery/components/photo-list-item/photo-list-item.component';
import {PhotoService} from 'src/app/modules/gallery/components/services/photo.service';
import {PhotoDtoModel} from 'src/app/shared/models/photo-dto.model';

@Component({
  selector: 'app-images',
  imports: [
    PhotoListItemComponent,
    PageNumberNavigationComponent
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.css'
})
export class PhotoListComponent {
  photoList !: PhotoDtoModel[];

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
  ) {
  }

  //TODO: MR3: don't use oninit
  ngOnInit() {
    //TODO: MR3: validate parameter (maybe reuse other validation)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.photoService.getPhotoPage(id).subscribe({
      next: (photoList) => {
        this.photoList = photoList;
        if (this.photoList.length == 0) {
          this.router.navigate(['/404']);
        }
      },
      error: (err) => this.router.navigate(['/404'])
    });
  }
}
