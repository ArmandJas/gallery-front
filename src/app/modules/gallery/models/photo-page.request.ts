export class PhotoPageRequest {
  constructor(
    public pageNumber: number = 0,
    public pageSize: number = 12,
    public id?: number,
    public name?: string,
    public description?: string,
    public uploadDateStart?: string,
    public uploadDateEnd?: string,
    public tags?: string[],
  ) {
  }

  static clone(photoPageRequest: PhotoPageRequest) {
    return JSON.parse(JSON.stringify(photoPageRequest));
  }
}
