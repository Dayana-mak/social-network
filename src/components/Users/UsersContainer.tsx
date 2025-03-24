import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer";
import { Component } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCounts,
  getUsers,
} from "../../redux/user-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends Component<PropsType> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNum: number): void => {
    this.props.requestUsers(pageNum, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isLoading ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          onPageChange={this.onPageChange}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCounts(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
  };
};
export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  follow,
  unfollow,
  requestUsers,
})(UsersContainer);
