export class PhotoUploadRequest {
  constructor(
    public name: string = "",
    public image: File = new File([""], "temp"),
    public tags: string[] = [],
    public description?: string,
  ) {
  }
}
