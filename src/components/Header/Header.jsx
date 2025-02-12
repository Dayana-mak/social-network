import { NavLink } from 'react-router-dom';
import s from './Header.module.css'

function Header(props) {
  return (
    <header className={s.header}>
      <img src="https://steamuserimages-a.akamaihd.net/ugc/2296339440150148468/D1E7596B00EC41623A8121E5AEF8C96776B1AED3/?imw=512&imh=400&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
           alt="Logo"/>

      <div className={s.loginBlock}>
        { props.isAuth 
          ? <div>{props.login} <div><button onClick={props.logout}>Logout</button></div></div> 
          : <NavLink to={"/login"}>Login</NavLink>}
        
      </div>
    </header>
    );
}

export default Header;