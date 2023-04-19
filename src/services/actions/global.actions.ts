import globalTypes from "./types/global.types";

// export const changeTheme = (theme: IThemeName) => ({
//   type: globalTypes.CHANGE_THEME,
//   payload: theme,
// });

export const otherAction = (params: any) => ({
  type: globalTypes.CHANGE_THEME,
  payload: { params },
});

export const putSignIn = (data: any) => ({
  type: globalTypes.START_PUT_SIGN_IN_APP,
  payload: { data },
});

export const notAccessPage = (data: any) => ({
  type: globalTypes.NOT_ACCESS_PAGE,
  payload: { data },
});

export const putMessageError423 = (data: any) => ({
  type: globalTypes.SET_EMTPY_DATA_423,
  payload: { data },
});
