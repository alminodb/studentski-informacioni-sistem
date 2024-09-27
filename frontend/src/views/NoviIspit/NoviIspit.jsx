import { createRef, useContext, useEffect, useState } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import axios from "axios";
import PredmetContext from "../../context/predmet-context";
import FunctionalContext from "../../context/functional-context";

function NoviIspit() {

    const predmetId = createRef("");
    const datetime = createRef("");

    const predmetCtx = useContext(PredmetContext);
    const functionalCtx = useContext(FunctionalContext);

    let current_datetime = new Date();
    let current_year = current_datetime.getFullYear();
    let current_month = ("0" + (current_datetime.getMonth() + 1)).slice(-2);
    let current_day = ("0" + (current_datetime.getDate())).slice(-2);
    current_datetime = current_year + "-" + current_month + "-" + current_day + "T00:00";

    const noviIspitHandler = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3001/ispit/dodaj", {
            "predmet_id": predmetId.current.value,
            "datum_vrijeme": datetime.current.value.replace('T', ' ')
        }).then(({ data }) => {
            if (!data.insertId) {
                functionalCtx.setPopupText(data)
            }
            else {
                functionalCtx.setPopupText("Uspjesno ste dodali ispit iz predmeta " + predmetCtx.list.filter(x => x.id == predmetId.current.value)[0].naziv);
            }
        })
    }

    return (
        <div className="main-view novi-ispit">
            <MainPanelHeader title="Dodaj novi ispit u bazu" />

            <form className="new-stuff__form" onSubmit={noviIspitHandler}>
                <label>Predmet</label>
                <select label="Predmet" ref={predmetId}>
                    {predmetCtx.list.map((p) => <option key={p.id} value={p.id}>{p.naziv}</option>)}
                </select>
                <label>Datum i vrijeme</label>
                <input type="datetime-local" ref={datetime} min={"2024-07-02T00:00"} />
                <button type="submit">Dodaj ispit</button>
            </form>
        </div>
    );
}

export default NoviIspit;