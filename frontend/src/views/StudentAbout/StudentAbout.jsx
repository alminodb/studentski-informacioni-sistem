import { useContext } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import "./StudentAbout.css";
import convertDate from "../../hooks/date-hook";
import StudentContext from "../../context/student-context";

function StudentAbout() {

    const ctx = useContext(StudentContext);

    var datumRodjenja = new Date(ctx.student.datum_rodjenja);
    const fullDatumRodjenja = convertDate(datumRodjenja);
    const spol = (ctx.student.spol === 'M') ? "Musko" : "Zensko";


    return (
        <div className="student-about">
            <MainPanelHeader title="Licni podaci" />

            <div className="student-about__wrapper">
                <table>
                    {(ctx.role === "student") && (<>
                        <tbody>
                            <tr>
                                <td>Akademska godina upisa</td>
                                <td>{ctx.student.akademska_godina_upisa}</td>
                            </tr>
                            <tr>
                                <td>Semestar</td>
                                <td>{ctx.student.semestar}</td>
                            </tr>
                            <tr>
                                <td>Broj indexa</td>
                                <td>{ctx.student.broj_indeksa}</td>
                            </tr>
                            <tr>
                                <td>JMBG</td>
                                <td>{ctx.student.jmbg}</td>
                            </tr>
                            <tr>
                                <td>Ime</td>
                                <td>{ctx.student.ime}</td>
                            </tr>
                            <tr>
                                <td>Prezime</td>
                                <td>{ctx.student.prezime}</td>
                            </tr>
                            <tr>
                                <td>Spol</td>
                                <td>{spol}</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>{ctx.student.mail}</td>
                            </tr>
                            <tr>
                                <td>Telefon</td>
                                <td>{ctx.student.telefon}</td>
                            </tr>
                            <tr>
                                <td>Datum rodjenja</td>
                                <td>{fullDatumRodjenja}</td>
                            </tr>
                            <tr>
                                <td>Mjesto rodjenja</td>
                                <td>{ctx.student.mjesto_rodjenja}</td>
                            </tr>
                            <tr>
                                <td>Adresa boravista</td>
                                <td>{ctx.student.adresa_boravista}</td>
                            </tr>
                        </tbody>
                    </>)}

                    {(ctx.role === "profesor") && (<>
                        <tbody>
                            <tr>
                                <td>JMBG</td>
                                <td>{ctx.student.jmbg}</td>
                            </tr>
                            <tr>
                                <td>Ime</td>
                                <td>{ctx.student.ime}</td>
                            </tr>
                            <tr>
                                <td>Prezime</td>
                                <td>{ctx.student.prezime}</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>{ctx.student.mail}</td>
                            </tr>
                            <tr>
                                <td>Telefon</td>
                                <td>{ctx.student.telefon}</td>
                            </tr>
                            <tr>
                                <td>Zvanje</td>
                                <td>{ctx.student.zvanje}</td>
                            </tr>
                        </tbody>
                    </>)}

                </table>
            </div>
        </div>
    );
}

export default StudentAbout;