import { useContext } from "react";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import PolozeniIspit from "./PolozeniIspit";
import "./PolozeniIspiti.css";
import IspitContext from "../../context/ispit-context";
import PredmetContext from "../../context/predmet-context";

function PolozeniIspiti() {

    const ispitCtx = useContext(IspitContext);
    const predmetCtx = useContext(PredmetContext);

    const getPredmetByIspitId = id => {
        const predmet_id = ispitCtx.list.filter(x => x.id == id)[0].predmet_id;
        return predmetCtx.list.filter(x => x.id == predmet_id)[0];
    }

    const getIspitById = id => {
        return ispitCtx.list.filter(x => x.id == id)[0];
    }

    const prosjekOcjena = () => {
        let suma = 0;
        ispitCtx.polozeni.map(ispit => {
            suma += ispit.ocjena;
        })

        return suma / ispitCtx.polozeni.length;
    }

    return (
        <div className="polozeni-ispiti">
            <MainPanelHeader title="Polozeni ispiti" />

            <div className="polozeni-ispiti__prosjek-wrapper">
                Broj polozenih ispita: <b>{ispitCtx.polozeni.length}</b>.
                Prosjek ocjena: <b>{prosjekOcjena()}</b>
            </div>

            <table className="polozeni-ispiti__table">
                <thead className="polozeni-ispiti__table-header">
                    <tr>
                        <th className="">R. br.</th>
                        <th className="polozeni-ispiti__predmet">Naziv predmeta</th>
                        <th className="polozeni-ispiti__ocjena">Ocjena</th>
                        <th className="">Datum polaganja</th>
                        <th className="">semestar</th>
                    </tr>
                </thead>
                <tbody>
                    {ispitCtx.polozeni.map((x, index) => <PolozeniIspit rb={index+1}
                        predmet={getPredmetByIspitId(x.ispit_id).naziv}
                        ocjena={x.ocjena}
                        datumIspita={getIspitById(x.ispit_id).datum_vrijeme.slice(0, 16).replace('T', ' ')}
                        semestar={getPredmetByIspitId(x.ispit_id).semestar} />)}

                </tbody>
            </table>
        </div>
    );
}

export default PolozeniIspiti;