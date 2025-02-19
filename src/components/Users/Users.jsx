import Paginator from "../common/FormControls/Paginator/Paginator";
import User from "./User";

const Users = ({
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
