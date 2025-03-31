export class PhotoDto {
  constructor(
    public name: string = "",
    public tags: string[] = [],
    public id: number = -1,
    public imageBase64?: string,
    public uploadDateTime?: string,
    public description?: string,
  ) {
  }
}
