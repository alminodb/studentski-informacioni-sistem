import { useContext } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import Information from "./Information";
import "./Informations.css";
import ObavjestenjaContext from "../../context/obavjestenje-context";

function Informations() {

    const ctx = useContext(ObavjestenjaContext);
    
    return (
        <div className="informations">

            <MainPanelHeader title="Obavjestenja" />

            {ctx.list.map((c, index) => <Information title={c.naslov} date={c.datum} key={index} />)}

            {ctx.list.length > 10 ? (
                <div className="main-panel__button-wrapper">
                    <button className="main-panel__button">Ucitaj jos</button>
                </div>
            ) : <></>}

        </div>
    );
}

export default Informations;