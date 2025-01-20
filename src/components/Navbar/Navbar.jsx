import s from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={s.nav}>
      <ul>
        <li className={s.item}><a className={s.link} href="/profile">Profile</a></li>
        <li className={s.item}><a className={s.link} href="/messages">Messages</a></li>
        <li className={s.item}><a className={s.link} href="/news">News</a></li>
        <li className={s.item}><a className={s.link} href="/music">Music</a></li>
        <li className={s.item}><a className={s.link} href="/settings">Settings</a></li>
      </ul>
    </nav>
    );
}

export default Navbar;