import { IPagingNotPrefer } from "src/types";

export interface IParamsFilter extends IPagingNotPrefer {
  status?: 'A' | 'D'
  q?: string;
}  
export interface typePropsColumn {
  btnOpenModal: (value: any) => void;
  btnChangeStatus: (value: any) => void;
  btnOpenUpdatePassword: (values: any) => void;
}