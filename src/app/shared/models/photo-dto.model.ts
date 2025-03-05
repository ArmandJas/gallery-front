export class PhotoDtoModel {
  constructor(
    public name: string = "",
    public imageBase64: string = "",
    public tags: string[] = [],
    public id: number = -1,
    public uploadDateTime: string = "",
    public description?: string,
  ) {
  }
}
