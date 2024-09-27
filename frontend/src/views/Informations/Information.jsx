import "./Informations.css";

function Information(props) {
    
    return(
        <a className="information" href="#">
            <img className="information__image" src="https://placehold.co/80" />
            <div className="information__text-wrapper">
                <span className="information__title">{props.title}</span>
                <span className="information__author">Objavljeno: {props.date}</span>
            </div>
        </a>
    );
}

export default Information;