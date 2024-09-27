import "./PolozeniIspiti.css";

function PolozeniIspit(props) {
    return (
        <tr>
            <td>{props.rb}</td>
            <td>{props.predmet}</td>
            <td>{props.ocjena}</td>
            <td>{props.datumIspita}</td>
            <td>{props.semestar}.</td>
        </tr>
    );
}

export default PolozeniIspit;