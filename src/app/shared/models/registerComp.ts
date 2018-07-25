
export class RegisterComp {
  constructor(
    public login_ins: string,
  public password: string,
  public repassword: string,
  public type: string,
  public cond_use = 0
  ) {}
}
