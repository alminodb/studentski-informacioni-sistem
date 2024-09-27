import "./MainPanel.css";

function MainPanel(props) {

    return (
        <div className="main-panel" style={{ width: '100%' }}>
            {props.children}
        </div>
    );
}

export default MainPanel;