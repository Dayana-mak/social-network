import s from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={s.nav}>
      <ul>
        <li className={s.item}><a className={s.link} href="#" target='_blank'>Profile</a></li>
        <li className={s.item}><a className={s.link} href="#" target='_blank'>Messages</a></li>
        <li className={s.item}><a className={s.link} href="#" target='_blank'>News</a></li>
        <li className={s.item}><a className={s.link} href="#" target='_blank'>Music</a></li>
      </ul>
    </nav>
    );
}

export default Navbar;