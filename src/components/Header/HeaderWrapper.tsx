import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getAuthLogin, getIsAuth } from "../../redux/selectors/auth-selectors";
import { getProfileSmallAvatarSelector } from "../../redux/selectors/profile-selectors";
import { AppDispatchType } from "../../redux/redux-store";

const HeaderWrapper: React.FC = () => {
  const dispatch: AppDispatchType  = useDispatch();

  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getAuthLogin);
  const profileAvatar = useSelector(getProfileSmallAvatarSelector)
  
  const handleLogout = () => {
    dispatch(logout());
  };
    

  return (
      <Header
        logout={handleLogout}
        isAuth={isAuth}
        login={login}
        profileAvatar={profileAvatar}
      />
    );
}

export default HeaderWrapper; 