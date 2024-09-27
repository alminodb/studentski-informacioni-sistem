import axios from "axios";
import React, { useEffect, useState } from "react";

const PredmetContext = React.createContext({
    list: []
});

axios.defaults.withCredentials = true;
export const PredmetContextProvider = (props) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/predmeti").then(({ data }) => {
            if (Array.isArray(data))
                setList(data);
        })
    }, [])

    return (
        <PredmetContext.Provider value={{
            list: list
        }}>
            {props.children}
        </PredmetContext.Provider>
    )
}

export default PredmetContext;