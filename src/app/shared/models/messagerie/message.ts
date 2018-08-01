export class Message {
  constructor(
    public id?: number,
    public version?: number,
    public  sujet?: string,
    public  contenu?: string,
    public  date?: Date
  ) {
  }
}
