export class Appliance {
  id: number;
  name: string;
  mpuri: string;
  vo: string;

  constructor(appliance: any) {
    if (appliance) {
      this.id = appliance.id;
      this.name = appliance.id;
      this.mpuri = appliance.mpuri;
      this.vo = appliance.vo;
    }
  }
}
