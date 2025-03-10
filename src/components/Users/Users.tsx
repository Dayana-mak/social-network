import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  users: Array<UserType>
}

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
    <div>
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          followingInProgress={followingInProgress}
          unfollow={unfollow}
          follow={follow}
        />
      ))}
    </div>
  );
};

export default Users;
