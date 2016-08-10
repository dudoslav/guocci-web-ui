export class Credential {
  id: number;
  type: string;
  value: string;

  constructor(credential: any) {
    if (credential) {
      this.id = credential.id;
      this.type = credential.type;
      this.value = credential.value;
    }
  }
}
