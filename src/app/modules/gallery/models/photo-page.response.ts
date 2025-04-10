import {PhotoResponse} from 'src/app/modules/gallery/models/photo.response';

export class PhotoPageResponse {
  constructor(
    public photoPreviews: PhotoResponse[] = [],
    public photoTotalCount: number = 0
  ) {
  }
}
