import { Credential } from '../user/credential';

export class Instance {
  id: number;
  name: string;
  credentials: Credential[];
  applianceId: number;
  flavourId: number;
  userData: string;
}
