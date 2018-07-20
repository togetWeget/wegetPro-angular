export class Adresse {


  constructor(private _codePostal?: string, private _quartier?: string, private _ville?: string, private _pays?: string, private _email?: string) {
    this._codePostal = _codePostal;
    this._quartier = _quartier;
    this._ville = _ville;
    this._pays = _pays;
    this._email = _email;

  }

  get codePostal(): string {
    return this._codePostal;
  }

  set codePostal(value: string) {
    this._codePostal = value;
  }

  get quartier(): string {
    return this._quartier;
  }

  set quartier(value: string) {
    this._quartier = value;
  }

  get ville(): string {
    return this._ville;
  }

  set ville(value: string) {
    this._ville = value;
  }

  get pays(): string {
    return this._pays;
  }

  set pays(value: string) {
    this.pays = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }


}
