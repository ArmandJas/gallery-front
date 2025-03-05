import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PhotoDtoModel} from '../../../../shared/models/photo-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly url = 'api/photo/';

  constructor(
    private http: HttpClient,
  ) {
  }

  public savePhoto(photo: FormData) {
    return this.http.post<PhotoDtoModel>(this.url + "post", photo);
  }

  public getPhotoById(id: Number) {
    return this.http.get<PhotoDtoModel>(this.url + id);
  }
}
