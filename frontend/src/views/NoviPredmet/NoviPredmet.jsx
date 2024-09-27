import { createRef, useContext } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import FunctionalContext from "../../context/functional-context";
import axios from "axios";

function NoviPredmet() {

    const nazivPredmeta = createRef("");
    const semestar = createRef("");

    const functionalCtx = useContext(FunctionalContext);

    axios.defaults.withCredentials = true;
    const addSubjectHandler = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3001/predmet/dodaj", {
            "naziv": nazivPredmeta.current.value,
            "semestar": semestar.current.value
        }).then(({data}) => {
            if (!data.insertId) {
                functionalCtx.setPopupText(data)
            }
            else {
                functionalCtx.setPopupText("Uspjesno ste dodali predmet \"" + nazivPredmeta.current.value + "\"");
            }
        })
    }

    return (
        <div className="main-view novi-predmet">
            <MainPanelHeader title="Dodaj novi predmet u bazu" />

            <form className="new-stuff__form" onSubmit={addSubjectHandler}>
                <label>Naziv predmeta</label>
                <input type="text" placeholder="Naziv predmeta" ref={nazivPredmeta} />
                <label>Semestar</label>
                <input type="text" placeholder="Semestar" ref={semestar} />
                <button type="submit">Dodaj predmet</button>
            </form>
        </div>
    )
}

export default NoviPredmet;