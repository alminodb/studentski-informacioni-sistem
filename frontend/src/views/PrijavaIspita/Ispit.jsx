import "./PrijavaIspita.css";

function Ispit(props) {

    return(
        <tr>
            <td>{props.ispit}</td>
            <td>{props.datumispita}</td>
            <td>{props.semestar}</td>
            <td><button>Prijavi/Odjavi</button></td>
        </tr>
    );
}

export default Ispit