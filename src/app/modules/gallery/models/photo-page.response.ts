import {PhotoDto} from 'src/app/modules/gallery/models/photo.dto';

export class PhotoPageResponse {
  constructor(
    public photoPreviews: PhotoDto[] = [],
    public photoCount: number = 0
  ) {
  }
}
