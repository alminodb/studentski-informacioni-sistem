import { createRef, useContext, useRef } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import "./StudentRegister.css";
import FunctionalContext from "../../context/functional-context";
import axios from "axios";

function StudentRegister() {

    const functionalCtx = useContext(FunctionalContext)

    const jmbg = createRef("");
    const lozinka = createRef("lozinkica");
    const ime = createRef("");
    const prezime = createRef("");
    const datum_rodjenja = createRef("");
    const mjesto_rodjenja = createRef("");
    const spol = createRef("");
    const drzavljanstvo = createRef("");
    const adresa_boravista = createRef("");
    const telefon = createRef("");
    const mail = createRef("");
    const broj_indeksa = createRef("");
    const semestar = createRef("");
    const akademska_godina_upisa = createRef("");

    axios.defaults.withCredentials = true;
    const studentRegisterHandler = (event) => {
        event.preventDefault();

        if (!(
            jmbg.current.value &&
            // lozinka.current.value &&
            ime.current.value &&
            prezime.current.value &&
            datum_rodjenja.current.value &&
            mjesto_rodjenja.current.value &&
            spol.current.value &&
            drzavljanstvo.current.value &&
            adresa_boravista.current.value &&
            telefon.current.value &&
            mail.current.value &&
            broj_indeksa.current.value &&
            semestar.current.value &&
            akademska_godina_upisa.current.value
        )) {
            functionalCtx.setPopupText("Morate popuniti sva polja!");
        }

        axios.post("http://localhost:3001/student/register", {
            "jmbg": jmbg.current.value,
            "lozinka": lozinka.current.value,
            "ime": ime.current.value,
            "prezime": prezime.current.value,
            "datum_rodjenja": datum_rodjenja.current.value,
            "mjesto_rodjenja": mjesto_rodjenja.current.value,
            "spol": spol.current.value,
            "drzavljanstvo": drzavljanstvo.current.value,
            "adresa_boravista": adresa_boravista.current.value,
            "telefon": telefon.current.value,
            "mail": mail.current.value,
            "broj_indeksa": broj_indeksa.current.value,
            "semestar": semestar.current.value,
            "akademska_godina_upisa": akademska_godina_upisa.current.value,
            "uloga": "student"
        }).then(({ data }) => {
            if (data) {
                if (!data.insertId) {
                    functionalCtx.setPopupText(data)
                }
                else {
                    if (spol.current.value === "musko")
                        functionalCtx.setPopupText("Uspjesno ste dodali studenta " + ime.current.value + " " + prezime.current.value + " u bazu.");
                    else
                        functionalCtx.setPopupText("Uspjesno ste dodali studenticu " + ime.current.value + " " + prezime.current.value + " u bazu.");
                }
            }
        })
    }


    return (
        <div className="student-register">
            <MainPanelHeader title="Dodavanje novog studenta u sistem" />

            <div className="main-view student-register__wrapper">
                <form className="new-stuff__form" onSubmit={studentRegisterHandler}>
                    <label>Ime i prezime</label>
                    <div className="student-register__name-lastname">
                        <input type="text" placeholder="Ime" ref={ime} />
                        <input type="text" placeholder="Prezime" ref={prezime} />
                    </div>
                    <label>JMBG</label>
                    <input type="text" placeholder="JMBG" ref={jmbg} />
                    <label>Lozinka</label>
                    <input type="text" placeholder="Sifra se generise automatski" ref={lozinka} />
                    <label>Datum rodjenja</label>
                    <input type="text" placeholder="Datum rodjenja" ref={datum_rodjenja} />
                    <label>Mjesto rodjenja</label>
                    <input type="text" placeholder="Mjesto rodjenja" ref={mjesto_rodjenja} />
                    <label>Spol</label>
                    <select label="Spol" ref={spol}>
                        <option value="musko">Musko</option>
                        <option value="zensko">Zensko</option>
                    </select>
                    <label>Drzavljanstvo</label>
                    <input type="text" placeholder="Drzavljanstvo" ref={drzavljanstvo} />
                    <label>Adresa boravista</label>
                    <input type="text" placeholder="Adresa boravista" ref={adresa_boravista} />
                    <label>Telefon</label>
                    <input type="text" placeholder="Telefon" ref={telefon} />
                    <label>E-mail</label>
                    <input type="text" placeholder="E-mail" ref={mail} />
                    <label>Broj indeksa</label>
                    <input type="text" placeholder="Broj indeksa" ref={broj_indeksa} />
                    <label>Semestar</label>
                    <input type="text" placeholder="Semestar" ref={semestar} />
                    <label>Akademska godina upisa</label>
                    <input type="text" placeholder="Akademska godina upisa" ref={akademska_godina_upisa} />
                    <button type="submit">Dodaj studenta</button>
                </form>
            </div>
        </div>
    );
}

export default StudentRegister;