import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {PhotoPageRequest} from '../models/photo-page.request';
import {PhotoPageResponse} from '../models/photo-page.response';
import {PhotoDto} from '../models/photo.dto';

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

  public getPhotoById(id: Number) {
    return this.http.get<PhotoDto>(this.url + id)
      .pipe(map(response => this.prependBase64ImageHeader(response)));
  }

  public findPhotoPage(photoPageRequest: PhotoPageRequest) {
    const backEndPageNumber = photoPageRequest.pageNumber - 1;
    photoPageRequest.pageNumber = backEndPageNumber;

    return this.http.post<PhotoPageResponse>(this.url + "search", photoPageRequest)
      .pipe(tap(response => {
        response.photoPreviews.map(preview => this.prependBase64ImageHeader(preview));
        return response;
      }));
  }

  private prependBase64ImageHeader(photoDto: PhotoDto) {
    photoDto.imageBase64 = this.BASE64_HEADER + photoDto.imageBase64;
    return photoDto;
  }
}
