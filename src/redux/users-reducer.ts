import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

const initialState = {
  users: [] as Array<UserType>,
  currentPage: 1,
  pageSize: 10,
  totalUsersCount: 100,
  isLoading: true,
  followingInProgress: [] as Array<number> //array of users Ids
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }
          return user;
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user;
        })
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNum
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      };
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };
    default:
      return state;
  }
}

type FollowSuccesActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSucces = (userId: number): FollowSuccesActionType => ({ type: FOLLOW, userId });

type UnfollowSuccesActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSucces = (userId: number): UnfollowSuccesActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  pageNum: number
}
export const setCurrentPage = (pageNum: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, pageNum });

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

type ToggleIsLoadingActionType = {
  type: typeof TOGGLE_IS_LOADING
  isLoading: boolean
}
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({ type: TOGGLE_IS_LOADING, isLoading });

type ToggleFollowingInProgressActionType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressActionType => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId });

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsLoading(true));

    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsLoading(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingInProgress(true, userId));

  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow, followSucces)
  }
}

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSucces)
  }
}

export default usersReducer;