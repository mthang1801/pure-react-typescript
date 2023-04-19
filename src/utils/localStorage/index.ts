// import { ILanguage, IThemeName } from "src/services/interfaces/global.interfaces";
import { ILanguage, IThemeName } from "src/cores/interfaces/global.interfaces";

const ACCOUNT = 'ACCOUNT';
const TOKEN = 'TOKEN';
const LANGUAGE = 'LANGUAGE';
const THEME = 'THEME';
const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN';
const MENU = 'MENU';
const AUTH_UUID = 'AUTH_UUID';

/****************************START**************************/
/*                          Acccount                       */

export function localSaveAccount(params: string) {
  return localStorage.setItem(ACCOUNT, params);
}

export function localGetAccount() {
  return localStorage.getItem(ACCOUNT);
}

export function localRemoveAccount() {
  return localStorage.removeItem(ACCOUNT);
}

/**************************** END **************************/

/****************************START**************************/
/*                           Token                         */

export function localSaveToken(params: string) {
  return localStorage.setItem(TOKEN, params);
}

export function localGetToken() {
  return localStorage.getItem(TOKEN);
}

export function localRemoveToken() {
  return localStorage.removeItem(TOKEN);
}

/**************************** END **************************/

/****************************START**************************/
/*                         Language                        */

export function localSaveLanguage(params: ILanguage) {
  return localStorage.setItem(LANGUAGE, params);
}

export function localGetLangage(): ILanguage {
  //string
  let localLanguage = localStorage.getItem(LANGUAGE);
  let result: ILanguage = 'en';
  //convert to type light or dark
  if (localLanguage === 'fr' || localLanguage === 'vi') {
    result = localLanguage;
  }
  return result;
}

export function localRemoveLanguage() {
  return localStorage.removeItem(LANGUAGE);
}

/**************************** END **************************/

/****************************START**************************/
/*                           Theme                         */

export function localSaveTheme(params: IThemeName) {
  return localStorage.setItem(THEME, params);
}

export function localGetTheme(): IThemeName {
  //string
  let localTheme = localStorage.getItem(THEME);
  let result: IThemeName = 'light';
  //convert to type light or dark
  if (localTheme === 'light' || localTheme === 'dark') {
    result = localTheme;
  }
  return result
}

export function localRemoveTheme() {
  return localStorage.removeItem(THEME);
}

/**************************** END **************************/

/****************************START**************************/
/*                      Acccount Login                     */

export function localSaveFormLogin(params: string) {
  return localStorage.setItem(ACCOUNT_LOGIN, params);
}

export function localGetFormLogin() {
  return localStorage.getItem(ACCOUNT_LOGIN);
}

export function localRemoveFormLogin() {
  return localStorage.removeItem(ACCOUNT_LOGIN);
}

/**************************** END **************************/

/****************************START**************************/
/*                           Menu                          */

export function localSaveMenu(params: string) {
  return localStorage.setItem(MENU, params);
}

export function localGetMenu() {
  return localStorage.getItem(MENU);
}

export function localRemoveMenu() {
  return localStorage.removeItem(MENU);
}

/**************************** END **************************/

/****************************START**************************/
/*                        Auth UUID                        */

export function localSaveAuthUUID(params: string) {
  return localStorage.setItem(AUTH_UUID, params);
}

export function localGetAuthUUID() {
  return localStorage.getItem(AUTH_UUID);
}

export function localRemoveAuthUUID() {
  return localStorage.removeItem(AUTH_UUID);
}

/**************************** END **************************/
