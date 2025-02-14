import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer";
import { Component } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { getCurrentPage, getFollowingInProgress, getIsLoading, getPageSize, getTotalUsersCounts, getUsers,  } from "../../redux/user-selectors";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChange = (pageNum) => {
    this.props.requestUsers(pageNum, this.props.pageSize)
  }

  render() {
    return (
      <>
      { this.props.isLoading ?  <Preloader/> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             users={this.props.users}
             onPageChange={this.onPageChange}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
             followingInProgress={this.props.followingInProgress}
             />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    currentPage: getCurrentPage(state),
    pageSize:  getPageSize(state),
    totalUsersCount: getTotalUsersCounts(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state)
  }
}
export default connect(mapStateToProps, {
  follow,
  unfollow,
  requestUsers
})(UsersContainer);

/* const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (pageNum) => {
      dispatch(setCurrentPageAC(pageNum))
    },
    setTotalUsersCount: (totalUsersCount) => {
      dispatch(setTotalUsersCountAC(totalUsersCount))
    },
    toggleisLoading: (isLoading) => {
      dispatch(toggleIsLoadingAC(isLoading))
    }
  }
} */
