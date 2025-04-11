export class PhotoResponse {
  constructor(
    public name: string = "",
    public tags: string[] = [],
    public id: number = -1,
    public uploadDateTime?: string,
    public description?: string,
  ) {
  }
}
