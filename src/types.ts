
import { EMAIL, EMPTY, PASSWORD, PHONE, PHONEANDEMAIL, TEXT, URL } from './constants';
import { IRootReducers } from 'src/cores/interfaces/root.interfaces';

export interface AppState extends IRootReducers { };

export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';
export type ReviewStatus = 'accepted' | 'pending' | 'rejected';
declare global {
  interface Window {
    restServer: any;
  }
}

export type typeMess =
  | typeof TEXT
  | typeof PHONE
  | typeof EMAIL
  | typeof PASSWORD
  | typeof URL
  | typeof EMPTY

export type typeInput =
  | typeof TEXT
  | typeof PHONE
  | typeof EMAIL
  | typeof PASSWORD
  | typeof PHONEANDEMAIL

export interface RouteParams {
  id: string;
  id1: string;
  id2: string;
  id3: string;
}

export type typeButtonUI =
  | 'default'
  | 'ddv'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'light'
  | 'green'
  | 'secondGreen'

export interface IPaging {
  currentPage: number;
  sizePage: number;
}

export interface IPagingNotPrefer {
  currentPage?: number;
  sizePage?: number;
  isDispatch?: boolean;
  total?: number;
}