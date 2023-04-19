import { IRootState } from "./root.interfaces";

export interface IAccountState {
  stateSignIn: IRootState;
  stateRegister: IRootState;
  phone?: string | null;
  email?: string | null;
	familyName? : string;
	givenName?:string;
	imageUrl?: string;
	providerId?:string;
	extra_data?: string;
}


