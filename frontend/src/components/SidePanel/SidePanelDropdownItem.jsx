import { useState } from "react";
import "./SidePanelDropdown.css";

function SidePanelDropdownItem(props) {

    const getViewComponent = () => {
        props.MainView(props.view);
    }

    return(
        <div className="side-panel-dropdown__item" onClick={getViewComponent}>{props.title}</div>
    );
}

export default SidePanelDropdownItem;