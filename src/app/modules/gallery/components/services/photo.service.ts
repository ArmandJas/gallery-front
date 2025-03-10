import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
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

  public getPhotoById(id: Number) {
    return this.http.get<PhotoDto>(this.url + id)
      .pipe(map(response => this.prependBase64ImageHeader(response)));
  }

  private prependBase64ImageHeader(photoDto: PhotoDto) {
    photoDto.imageBase64 = this.BASE64_HEADER + photoDto.imageBase64;
    return photoDto;
  }

  public getPhotoPage(id: Number) {
    return this.http.get<PhotoDtoModel[]>(this.url + "page/" + id);
  }
}
