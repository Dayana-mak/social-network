import { Box, Paper } from "@mui/material";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  users: Array<UserType>;
};

const Users: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChange,
  followingInProgress,
  follow,
  unfollow,
  users,
}) => {
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
        {users.map((user) => (
          <User
            user={user}
            key={user.id}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default Users;
