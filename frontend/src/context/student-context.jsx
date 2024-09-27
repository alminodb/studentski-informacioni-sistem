import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const StudentContext = React.createContext({
    isLoggedIn: false,
    student: {},
    info: "",
    role: "",
    loginHandler: () => { },
    logoutHandler: () => { }
});

axios.defaults.withCredentials = true;
export const StudentContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [student, setStudent] = useState({});
    const [info, setInfo] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/").then(({ data }) => {
            if (data) {
                if (data.loggedin) {
                    setIsLoggedIn(data.loggedin);
                }
                if (data.student) {
                    setStudent(data.student);
                }
                if(data.uloga) {
                    setRole(data.uloga);
                }
            }
        })
    }, [])

    const loginHandler = (event) => {
        event.preventDefault();
        if (event.target.elements.jmbg.value && event.target.elements.password.value) {
            axios.post("http://localhost:3001/login",
                {
                    jmbg: event.target.elements.jmbg.value,
                    password: event.target.elements.password.value
                }).then(({ data }) => {
                    if (data.student_id || data.id) {
                        // uspjesan login
                        setIsLoggedIn(true);
                        setStudent(data);
                        setRole(data.uloga);
                    }
                    else {
                        setInfo("JMBG i lozinka se ne poklapaju.")
                    }
                });
        }
    }

    const logoutHandler = () => {
        axios.post("http://localhost:3001/logout").then(({ data }) => {
            setIsLoggedIn(false);
            setInfo("");
            setRole("");
        })
    }

    return (
        <StudentContext.Provider value={{
            isLoggedIn: isLoggedIn,
            student: student,
            info: info,
            role: role,
            loginHandler: loginHandler,
            logoutHandler: logoutHandler
        }}>
            {props.children}
        </StudentContext.Provider>
    );
}

export default StudentContext;