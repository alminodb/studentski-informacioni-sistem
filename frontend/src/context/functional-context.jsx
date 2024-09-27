import React, { useEffect, useState } from "react";

const FunctionalContext = React.createContext({
    popupTop: "",
    popupText: "",
    setPopupText: () => { }
});

export const FunctionalContextProvider = props => {

    const [popupText, setPopupText] = useState("");
    const [popupTop, setPopupTop] = useState("-300px");

    useEffect(() => {
        if (popupText != "")
            movePopup();
    }, [popupText]);

    const movePopup = () => {
        setPopupTop("15px");
        setTimeout(() => {
            setPopupTop("-300px");
            setPopupText("");
        }, 3000);
    }

    return (
        <FunctionalContext.Provider value={{
            popupTop: popupTop,
            popupText: popupText,
            setPopupText: setPopupText
        }}>
            {props.children}
        </FunctionalContext.Provider>
    );
}

export default FunctionalContext;