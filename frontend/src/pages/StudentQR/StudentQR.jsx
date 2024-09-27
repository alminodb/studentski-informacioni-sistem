import "./StudentQR.css";
import logo from "../../assets/images/unze-logo.png"

function StudentQR() {
    return(
        <div className="student-qr">
            <img className="student-qr__logo" src={logo} alt="UNZE LOGO" />
            <h2 className="student-qr__jmbg">Vas jmbg za prijavu: 1302001190016</h2>
            <h2 className="student-qr__password">Vasa lozinka za prijavu: lozinkica</h2>
        </div>
    );
}

export default StudentQR;