export class Collection {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public createdAt: Date,
    public userId: string,
  ) {}
}
