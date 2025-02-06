import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/users-reducer";
import { Component } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }
 
  onPageChange = (pageNum) => {
    this.props.getUsers(pageNum, this.props.pageSize)
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
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  getUsers
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
