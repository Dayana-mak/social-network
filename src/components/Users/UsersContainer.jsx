import { connect } from "react-redux";
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsLoading, unfollow } from "../../redux/users-reducer";
import axios from "axios"
import { Component } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.toggleIsLoading(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
      this.props.toggleIsLoading(false);
      this.props.setUsers(response.data.items);
      /* this.props.setTotalUsersCount(response.data.totalCount); */
    })
  }
 
  onPageChange = (pageNum) => {
    this.props.setCurrentPage(pageNum);
    this.props.toggleIsLoading(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNum}&count=${this.props.pageSize}`).then(response => {
      this.props.toggleIsLoading(false);
      this.props.setUsers(response.data.items);
    })
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
    isLoading: state.usersPage.isLoading
  }
}

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

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsLoading
})(UsersContainer);