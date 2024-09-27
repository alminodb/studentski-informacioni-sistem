import { useContext } from "react";
import "./SidePanelProfile.css";
import StudentContext from "../../context/student-context";

function SidePanelProfile() {
    const ctx = useContext(StudentContext);
    return (
        <div className="side-panel-profile">
            <img className="side-panel-profile__image" src="https://placehold.co/70" />
            <div className="side-panel-profile__info">
                <span className="side-panel-profile__info-name">{ctx.student.ime} {ctx.student.prezime}</span>
            </div>
        </div>
    );
}

export default SidePanelProfile;