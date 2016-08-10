export class Site {
  id: number;
  name: string;
  country: string;
  endpoint: string;

  constructor(site: any) {
    if (site) {
      this.id = site.id;
      this.name = site.name;
      this.country = site.country;
      this.endpoint = site.endpoint;
    }
  }

}
