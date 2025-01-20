import { Link, NavLink } from "react-router-dom";
import s from "./Navbar.module.css"


function Navbar() {
  const setActive = ({ isActive }) => isActive ? s.active_link : s.link;
  return (
    <nav className={s.nav}>
      <ul>
        <li className={s.item}><NavLink className={setActive} to="/profile">Profile</NavLink></li>
        <li className={s.item}><NavLink className={setActive} to="/messages">Messages</NavLink></li>
        <li className={s.item}><NavLink className={setActive} to="/news">News</NavLink></li>
        <li className={s.item}><NavLink className={setActive} to="/music">Music</NavLink></li>
        <li className={s.item}><NavLink className={setActive} to="/settings">Settings</NavLink></li>
      </ul>
    </nav>
    );
}

export default Navbar;