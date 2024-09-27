import "./SidePanelTab.css";


function SidePanelTab(props) {

    const Icon = props.icon;

    const getViewComponent = () => {
        props.MainView(props.view);
    }

    return (
        <div className="side-panel-tab" onClick={getViewComponent}>
            <Icon className="side-panel-tab__icon" />
            <span className="side-panel-tab__title">
                {props.title}
            </span>
        </div>
    )
}

export default SidePanelTab;