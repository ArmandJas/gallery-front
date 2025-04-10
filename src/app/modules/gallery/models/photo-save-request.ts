import {PhotoResponse} from 'src/app/modules/gallery/models/photo.response';

export class PhotoSaveRequest {
  constructor(
    public name: string = "",
    public tags: string[] = [],
    public id?: number,
    public description?: string,
    public image?: File,
  ) {
  }

  public to(photoResponse: PhotoResponse) {
    let request = new PhotoSaveRequest();
    request.id = photoResponse.id;
    request.name = photoResponse.name;
    request.tags = photoResponse.tags;
    request.description = photoResponse.description;
    return request;
  }
}

