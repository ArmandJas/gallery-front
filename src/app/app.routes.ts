import {Routes} from '@angular/router';
import {RoutingConstants} from './core/util/routing-constants';
import {PhotoListComponent} from './modules/gallery/pages/photo-list/photo-list.component';
import {PhotoUploadComponent} from './modules/gallery/pages/photo-upload/photo-upload.component';
import {PhotoViewComponent} from './modules/gallery/pages/photo-view/photo-view.component';
import {PhotoEditComponent} from './modules/gallery/pages/photo-edit/photo-edit.component';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';

export const routes: Routes = [
  {
    path: RoutingConstants.PHOTO_LIST_PATH + '/:pageNumber',
    component: PhotoListComponent
  },
  {
    path: RoutingConstants.PHOTO_LIST_PATH,
    redirectTo: RoutingConstants.PHOTO_LIST_PATH + '/1'
  },
  {
    path: RoutingConstants.PHOTO_UPLOAD_PATH,
    component: PhotoUploadComponent
  },
  {
    path: RoutingConstants.PHOTO_VIEW_PATH + '/:id',
    component: PhotoViewComponent
  },
  {
    path: RoutingConstants.PHOTO_VIEW_PATH + '/:id/edit',
    component: PhotoEditComponent
  },
  {
    path: RoutingConstants.ERROR_PAGE_PATH + '/:errorNumber',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: RoutingConstants.ERROR_PAGE_PATH + '/404'
  },
];
