import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import StudentContext from "./student-context";

const IspitContext = React.createContext({
    list: [],
    polozeni: []
});

axios.defaults.withCredentials = true;
export const IspitContextProvider = (props) => {

    const [list, setList] = useState([]);
    const [polozeni, setPolozeni] = useState([]);

    const studentCtx = useContext(StudentContext);

    useEffect(() => {
        axios.get("http://localhost:3001/ispiti").then(({ data }) => {
            if (Array.isArray(data))
                setList(data);
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/polozeniispiti/" + studentCtx.student.student_id).then(({ data }) => {
            if (Array.isArray(data))
                setPolozeni(data);
        })
    }, [])

    return (
        <IspitContext.Provider value={{
            list: list,
            polozeni: polozeni
        }}>
            {props.children}
        </IspitContext.Provider>
    )
}

export default IspitContext;