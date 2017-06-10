// tslint:disable-next-line:no-reference
// for vscode
/// <reference path="../../../../types/global.d.ts" />

class Person {
  private db: GQL.IPersonType[];

  constructor(db) {
    this.db = db;
  }

  public findPerson = (id: string): GQL.IPersonType | undefined  => {
    return this.db.find((person) => person.id === id);
  }

  public addPerson = (person: GQL.IPersonType): GQL.IPersonType[]  => {
    this.db.push(person);
    return this.db;
  }
}

export default Person;
