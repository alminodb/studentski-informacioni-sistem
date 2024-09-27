import axios from "axios";
import React, { useEffect, useState } from "react";

const ObavjestenjaContext = React.createContext({
    list: []
});

axios.defaults.withCredentials = true;
export const ObavjestenjaContextProvider = (props) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/obavjestenja").then(({ data }) => {
            if (Array.isArray(data))
                setList(data);
        })
    }, [])

    return (
        <ObavjestenjaContext.Provider value={{
            list: list
        }}>
            {props.children}
        </ObavjestenjaContext.Provider>
    )
}

export default ObavjestenjaContext;