import { useContext } from "react";
import "./NavBar.css";
import StudentContext from "../../context/student-context";

function NavBar() {

    const ctx = useContext(StudentContext);

    return(
        <div className="nav-bar">
            <div className="nav-bar__logo">
                <h2 className="nav-bar__logo-text">Studentski informacioni sistem</h2>
            </div>
            <button className="nav-bar__logout-btn" onClick={ctx.logoutHandler}>Logout</button>
        </div>
    );
}

export default NavBar;