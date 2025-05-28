import { Box, Paper } from "@mui/material";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import Preloader from "../common/Preloader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/selectors/user-selectors";
import { follow, requestUsers, unfollow } from "../../redux/users-reducer";
import { AppDispatchType } from "../../redux/redux-store";
import { useEffect } from "react";


const UsersPage: React.FC = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const isLoading = useSelector(getIsLoading);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatchType = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize))
  }, []);

  const onPageChange = (pageNum: number): void => {
    dispatch(requestUsers(pageNum, pageSize))
  };

  const followUser = (userId: number): void => {
    dispatch(follow(userId))
  }

  const unfollowUser = (userId: number): void => {
    dispatch(unfollow(userId))
  }

  return (
    <Paper sx={{ p: 2, width: "100%", height: "100%" }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <Paginator
          totalItemsCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > *:last-child": {
            borderBottom: "none",
          },
        }}
      >
        {isLoading ? (
          <Preloader />
        ) : (
          users.map((user) => (
            <User
              user={user}
              key={user.id}
              followingInProgress={followingInProgress}
              unfollow={unfollowUser}
              follow={followUser}
            />
          ))
        )}
      </Box>
    </Paper>
  );
};

export default UsersPage;
