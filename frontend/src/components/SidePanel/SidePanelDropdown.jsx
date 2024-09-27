import { useState } from "react";
import "./SidePanelDropdown.css";
import { FaCaretRight } from "react-icons/fa";

function SidePanelDropdown(props) {

    const [activeClass, setActiveClass] = useState({
        class: "side-panel-dropdown",
        isActive: false
    });

    //side-panel-dropdown side-panel__active

    const dropdownHandler = () => {
        activeClass.isActive === false ? (
            setActiveClass({
                class: "side-panel-dropdown side-panel__active",
                parentStyle: {
                    overflow: "visible"
                },
                childStyle: {
                    position: "unset"
                },
                isActive: true,

            })
        ) : (
            setActiveClass({
                class: "side-panel-dropdown",
                parentStyle: {
                    overflow: "hidden"
                },
                childStyle: {
                    position: "absolute"
                },
                isActive: false
            })
        );
    }

    const Icon = props.icon;

    return (
        <div className="side-panel-dropdown__wrapper" style={activeClass.parentStyle}>
            <div className={activeClass.class} onClick={dropdownHandler}>
                <div className="side-panel-dropdown__test">
                    <Icon className="side-panel-dropdown__icon" />
                    <span className="side-panel-dropdown__title">
                        {props.title}
                    </span>
                </div>
                <FaCaretRight className="side-panel-dropdown__arrow" />
            </div>
            <div className="side-panel-dropdown__items" style={activeClass.childStyle}>
                {props.children}
            </div>
        </div>
    );
}

export default SidePanelDropdown;