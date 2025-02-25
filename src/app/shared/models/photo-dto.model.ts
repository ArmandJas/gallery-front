export class PhotoDtoModel {
  constructor(
    public name: string,
    public image: string,
    public description: string,
    public tags: string[],
    public id?: number,
    public uploadDateTime?: string,
  ) {
  }
}
