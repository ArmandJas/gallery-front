export class PhotoUploadDtoModel {
  constructor(
    public name: string = "",
    public image: File = new File([""], "temp"),
    public tags: string[] = [],
    public description?: string,
  ) {
  }
}
