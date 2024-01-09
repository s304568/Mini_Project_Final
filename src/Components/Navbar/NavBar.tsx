import { Outlet, Link } from "react-router-dom";
import {
  INDEX_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  NOTFOUND_PATH,
} from "../Constants/paths";
import "./navbar.css";

function NavBar() {
  return (
    <>
      <div className="navbar">
        <Link to={INDEX_PATH}>Home</Link>
        <Link to={SIGNUP_PATH}>Sign-Up</Link>
        <Link to={LOGIN_PATH}>Log-In</Link>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
