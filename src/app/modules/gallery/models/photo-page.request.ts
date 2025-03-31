export class PhotoPageRequest {
  constructor(
    public pageNumber: number = 0,
    public pageSize: number = 12,
    public id?: number,
    public name?: string,
    public description?: string,
    public tags: string[] = [],
    public uploadDateTimeStart?: string,
    public uploadDateTimeEnd?: string,
  ) {
  }

  static clone(photoPageRequest: PhotoPageRequest) {
    return JSON.parse(JSON.stringify(photoPageRequest));
  }
}
