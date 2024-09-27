import "./Login.css";
import logo from "../../assets/images/unze-logo.png";
import UNZE from "../../assets/images/UNZE.jpg";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentContext from "../../context/student-context";

function Login(props) {

    const ctx = useContext(StudentContext);
    const navigate = useNavigate();

    const [jmbg, setJmbg] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        if (ctx.isLoggedIn) navigate("/");
    }, [ctx.isLoggedIn])

    useEffect(() => {
        const validationTimer = setTimeout(() => {
            if(jmbg.length > 0 || password.length > 0) {
                if (jmbg.length != 13) setError("JMBG mora imati 13 znamenki.");
                else if (password.length < 6) setError("Morate unijeti vasu lozinku za prijavu.");
                else setError(ctx.info);
            } else setError("");
        }, 500);

        return () => {
            clearTimeout(validationTimer);
        }
    }, [jmbg, password, ctx.info]);

    const jmbgHandler = (event) => {
        setJmbg(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__wrapper-left">
                    <div className="login__header">
                        <img className="login__logo" src={logo} />
                    </div>
                    <div className="login__form-wrapper">
                        <h2 className="login__form-header">
                            Prijava
                        </h2>
                        <p className="login__form-subheader">
                            Za prijavu na studentski informacioni sistem koristite vas JMBG i lozinku.
                        </p>
                        <p className="login__form-error">
                            {error}
                        </p>
                        <form className="login__form" onSubmit={ctx.loginHandler}>
                            <input type="text" placeholder="JMBG" onChange={jmbgHandler} id="jmbg" />
                            <input type="password" placeholder="Password" onChange={passwordHandler} id="password" />
                            <button type="submit" className="login__form-button">Prijavi se</button>
                        </form>
                    </div>
                    <div className="login__footer">
                    </div>
                </div>
                <div className="login__wrapper-right" style={{ backgroundImage: `url(${UNZE})` }}>
                </div>
            </div>
        </div>
    );
}

export default Login;