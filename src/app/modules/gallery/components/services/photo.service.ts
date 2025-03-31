import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {PhotoPageRequest} from '../../models/photo-page.request';
import {PhotoPageResponse} from '../../models/photo-page.response';
import {PhotoDto} from '../../models/photo.dto';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly BASE64_HEADER = 'data:image;base64,';
  private readonly url = 'api/photo/';

  constructor(
    private http: HttpClient,
  ) {
  }

  public savePhoto(photo: FormData) {
    return this.http.post<PhotoDto>(this.url + "post", photo)
      .pipe(map(response => this.prependBase64ImageHeader(response)));
  }
  public deletePhotoById(id: Number){
    this.http.delete(this.url + id).subscribe();
  }

  public getPhotoById(id: Number) {
    return this.http.get<PhotoDto>(this.url + id)
      .pipe(map(response => this.prependBase64ImageHeader(response)));
  }

  public getPhotoPage(photoPageRequest: PhotoPageRequest) {
    const backEndPageNumber = photoPageRequest.pageNumber - 1;

    return this.http.post<PhotoPageResponse>(this.url + "page/" + backEndPageNumber, photoPageRequest)
      .pipe(map(response => {
        response.photoPreviews = this.mapPrependBase64Array(response.photoPreviews);
        return response;
      }));
  }

  private mapPrependBase64Array(photoDtoArray: PhotoDto[]) {
    if (photoDtoArray) {
      return photoDtoArray.map(photoDto => this.prependBase64ImageHeader(photoDto));
    }
    return photoDtoArray;
  }

  private prependBase64ImageHeader(photoDto: PhotoDto) {
    photoDto.imageBase64 = this.BASE64_HEADER + photoDto.imageBase64;
    return photoDto;
  }
}
