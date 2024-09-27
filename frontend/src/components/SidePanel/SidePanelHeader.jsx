import "./SidePanelHeader.css";

function SidePanelHeader(props) {

    
    return(
        <div className="side-panel-header">
            <h2 className="side-panel-header__text">{props.text.toUpperCase()}</h2>
        </div>
    );
}

export default SidePanelHeader;