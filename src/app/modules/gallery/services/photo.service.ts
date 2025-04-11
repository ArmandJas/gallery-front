import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PhotoResponse} from 'src/app/modules/gallery/models/photo.response';
import {PhotoPageRequest} from '../models/photo-page.request';
import {PhotoPageResponse} from '../models/photo-page.response';

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

  public save(photo: FormData) {
    return this.http.post<PhotoResponse>(this.url + "post", photo);
  }

  public edit(photo: FormData) {
    return this.http.put<PhotoResponse>(this.url + "edit", photo);
  }

  public delete(id: Number) {
    this.http.delete(this.url + id).subscribe();
  }

  public get(id: Number) {
    return this.http.get<PhotoResponse>(this.url + id);
  }

  public getImage(id: Number) {
    return this.http.get(this.url + id + "/image", {responseType: 'blob'});
  }

  public getThumbnail(id: Number) {
    return this.http.get(this.url + id + "/thumbnail", {responseType: 'blob'});
  }

  public findPhotoPage(photoPageRequest: PhotoPageRequest) {
    const backEndPageNumber = photoPageRequest.pageNumber - 1;
    photoPageRequest.pageNumber = backEndPageNumber;

    return this.http.post<PhotoPageResponse>(this.url + "search", photoPageRequest);
  }
}
