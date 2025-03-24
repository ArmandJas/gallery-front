import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {RoutingConstants} from 'src/app/core/util/routing-constants';
import {ErrorNavigator} from 'src/app/shared/util/error-navigator';
import {NumberValidator} from 'src/app/shared/util/number-validator';
import {PageNumberNavigationComponent} from '../../components/page-number-navigation/page-number-navigation.component';
import {PhotoListItemComponent} from '../../components/photo-list-item/photo-list-item.component';
import {PhotoSearchBarComponent} from '../../components/photo-search-bar/photo-search-bar.component';
import {PhotoService} from '../../components/services/photo.service';
import {PhotoPageRequest} from '../../models/photo-page.request';
import {PhotoPageResponse} from '../../models/photo-page.response';
import {PhotoDto} from '../../models/photo.dto';

@Component({
  selector: 'app-images',
  imports: [
    PhotoListItemComponent,
    PageNumberNavigationComponent,
    PhotoSearchBarComponent,
    TranslatePipe
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent {
  pageCount: number = 0;
  photoList: PhotoDto[] | undefined;
  currentPhotoPageRequest: PhotoPageRequest;
  isEmpty: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
  ) {
    this.currentPhotoPageRequest = new PhotoPageRequest();
    this.route.params.subscribe(() => this.loadPhotoList(this.currentPhotoPageRequest));
  }

  protected executeSearch(photoPageRequest: PhotoPageRequest) {
    this.currentPhotoPageRequest = PhotoPageRequest.clone(photoPageRequest);
    this.router.navigate([RoutingConstants.PHOTO_LIST_PATH])
      .then(() => this.loadPhotoList(photoPageRequest));
  }

  private loadPhotoList(photoPageRequest: PhotoPageRequest) {
    photoPageRequest.pageNumber = Number(this.route.snapshot.paramMap.get('pageNumber'));

    if (!NumberValidator.isPositiveNumber(photoPageRequest.pageNumber)) {
      ErrorNavigator.navigateToErrorPage(this.router);
      return;
    }

    this.currentPhotoPageRequest.pageNumber = photoPageRequest.pageNumber;
    this.photoService.getPhotoPage(photoPageRequest).subscribe({
      next: (photoPage: PhotoPageResponse) => {
        this.photoList = photoPage.photoPreviews;
        this.pageCount = this.calculatePageCount(photoPage.photoCount, photoPageRequest.pageSize);

        this.isEmpty = this.photoList.length == 0;
      },
      error: (err) => {
        ErrorNavigator.navigateToErrorPage(this.router, err);
      }
    });
  }

  private calculatePageCount(photoCount: number, pageSize: number) {
    return Math.ceil(photoCount / pageSize);
  }
}
