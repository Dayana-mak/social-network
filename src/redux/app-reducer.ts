import { getAuthUserData } from "./auth-reducer";
import { AppStateType, InferActionsType } from "./redux-store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

const INITIALIZED_SUCCESS = "SN/APP/INITIALIZED_SUCCESS" as const;

const initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type ActionTypes = InferActionsType<typeof appActions>;

export const appActions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS }),
};

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const initialize = (): ThunkType => async (dispatch: DispatchType) => {
  const promise = dispatch(getAuthUserData());
  await Promise.all([promise]);
  dispatch(appActions.initializedSuccess());
};

export default appReducer;
