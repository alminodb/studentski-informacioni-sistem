import "./MainPanel.css";

function MainPanelHeader(props) {
    return (
        <div className="main-panel-header">
            <h2 className="main-panel-header__title">{props.title}</h2>
        </div>
    );
}

export default MainPanelHeader;