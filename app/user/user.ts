export class User {

  id: number;
  name: string;
  email: string;

  constructor(user: any) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
    }
  }

}
