import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { UserType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

const FOLLOW = "SN/USERS/FOLLOW" as const;
const UNFOLLOW = "SN/USERS/UNFOLLOW" as const;
const SET_USERS = "SN/USERS/SET_USERS" as const;
const SET_CURRENT_PAGE = "SN/USERS/SET_CURRENT_PAGE" as const;
const SET_TOTAL_USERS_COUNT = "SN/USERS/SET_TOTAL_USERS_COUNT" as const;
const TOGGLE_IS_LOADING = "SN/USERS/TOGGLE_IS_LOADING" as const;
const TOGGLE_FOLLOWING_IN_PROGRESS = "SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS" as const;

const initialState = {
  users: [] as Array<UserType>,
  currentPage: 1,
  pageSize: 10,
  totalUsersCount: 100,
  isLoading: true,
  followingInProgress: [] as Array<number>, //array of users Ids
};

type InitialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNum,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type ActionTypes = InferActionsType<typeof usersActions>;

export const usersActions = {
  followSuccess: (userId: number) => ({
    type: FOLLOW,
    userId,
  }),
  unfollowSuccess: (userId: number) => ({
    type: UNFOLLOW,
    userId,
  }),
  setUsers: (users: Array<UserType>) => ({
    type: SET_USERS,
    users,
  }),
  setCurrentPage: (pageNum: number) => ({
    type: SET_CURRENT_PAGE,
    pageNum,
  }),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
  }),
  toggleIsLoading: (isLoading: boolean) => ({
    type: TOGGLE_IS_LOADING,
    isLoading,
  }),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId,
  }),
};

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const requestUsers = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch: DispatchType) => {
    dispatch(usersActions.setCurrentPage(currentPage));
    dispatch(usersActions.toggleIsLoading(true));

    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(usersActions.toggleIsLoading(false));
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (
    userId: number
  ) => Promise<{ resultCode: ResultCodesEnum; messages: string[] }>,
  actionCreator: (userId: number) => ActionTypes
) => {
  dispatch(usersActions.toggleFollowingInProgress(true, userId));

  const data = await apiMethod(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(usersActions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch: DispatchType) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow,
      usersActions.followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch: DispatchType) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow,
      usersActions.unfollowSuccess
    );
  };
};

export default usersReducer;
