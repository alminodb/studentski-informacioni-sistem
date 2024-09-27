import { useContext } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import Ispit from "./Ispit";
import "./PrijavaIspita.css";
import IspitContext from "../../context/ispit-context";
import PredmetContext from "../../context/predmet-context";
import convertDate from "../../hooks/date-hook";

function PrijavaIspita() {

    const ispitCtx = useContext(IspitContext);
    const predmetCtx = useContext(PredmetContext);

    let novo = ispitCtx.list;
    let test = ispitCtx.list.map((ispit, index) => {
        ispitCtx.polozeni.map((polIspit, ind) => {
            if(ispit.predmet_id == polIspit.predmet_id) {
                novo.splice(index, 1);
            }
        })
    })

    console.log(novo); 


    const getPredmetById = (id) => {
        return predmetCtx.list.filter(x => x.id == id)[0];
    }

    return (
        <div className="prijava-ispita">
            <MainPanelHeader title="Prijava ispita" />

            <table className="prijava-ispita__table">
                <thead className="prijava-ispita__table-header">
                    <tr>
                        <th className="prijava-ispita__ispit">Naziv predmeta</th>
                        <th className="prijava-ispita__datum-ispita">Datum i vrijeme ispita</th>
                        <th className="prijava-ispita__semestar">Semestar</th>
                        <th className="prijava-ispita__prijavi-odjavi">Prijavi/odjavi</th>
                    </tr>
                </thead>
                <tbody>
                    {ispitCtx.list.map((x) =>
                        <Ispit
                            ispit={getPredmetById(x.predmet_id).naziv}
                            datumispita={x.datum_vrijeme.slice(0, 16).replace('T', ' ')}
                            semestar={getPredmetById(x.predmet_id).semestar}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PrijavaIspita;