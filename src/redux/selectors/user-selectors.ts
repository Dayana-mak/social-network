import { AppStateType } from "../redux-store";

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
}


export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}

export const getIsLoading = (state: AppStateType) => {
  return state.usersPage.isLoading
}

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
}
