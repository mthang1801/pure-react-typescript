export interface AuthContextType {
  token: any;
  account: any;
  signIn: (token: string, account: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}