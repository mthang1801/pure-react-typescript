export type IThemeName = 'light' | 'dark';

export type ILanguage = 'en' | 'fr' | 'vi';

export interface IGlobalState {
  theme: IThemeName;
  otherState: any;
  isSignIn: boolean | null;
  notAccessPage: boolean | null;
  messageError423: string[];
}
