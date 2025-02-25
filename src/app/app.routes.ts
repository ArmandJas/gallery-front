import {Routes} from '@angular/router';
import {PHOTO_LIST_PATH, PHOTO_UPLOAD_PATH, PHOTO_VIEW_FULL_PATH} from 'src/app/core/util/routing-constants';
import {NotFoundPageComponent} from 'src/app/shared/components/not-found-page/not-found-page.component';
import {PhotoListComponent} from './modules/gallery/pages/photo-list/photo-list.component';
import {PhotoUploadComponent} from './modules/gallery/pages/photo-upload/photo-upload.component';
import {PhotoViewComponent} from './modules/gallery/pages/photo-view/photo-view.component';

export const routes: Routes = [
  {path: PHOTO_LIST_PATH, component: PhotoListComponent},
  {path: PHOTO_UPLOAD_PATH, component: PhotoUploadComponent},
  {path: PHOTO_VIEW_FULL_PATH, component: PhotoViewComponent},
  {path: '**', component: NotFoundPageComponent},
];
