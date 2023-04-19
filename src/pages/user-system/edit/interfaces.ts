/* eslint-disable */
export interface IFormUserSystem {
  fullname: string;
  password: string;
  phone: string;
  email: string;
  status: boolean;
}
export interface IPropsUserSystem {
  // visible: boolean;
  isCreate?: boolean | true;
  dataGroup?: any;
  onFinish: () => void;
  // onCancel:()=>void;
}
