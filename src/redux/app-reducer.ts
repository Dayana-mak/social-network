import { Dispatch } from "redux";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType } from "./redux-store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean;
}

const initialState: InitialStateType = {
  initialized: false
}
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
   
    default:
      return state;
  }
}

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
}

type ActionsType = InitializedSuccessActionType

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initialize = (): ThunkType => async (dispatch: DispatchType) => {
    const promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(initializedSuccess())
  }


export default appReducer;