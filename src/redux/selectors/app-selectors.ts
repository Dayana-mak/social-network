import { AppStateType } from "../redux-store";

export const getInitialized = (state: AppStateType): boolean => {
  return state.app.initialized;
}