import { useContext, useEffect, useState } from "react";
import Informations from "../../views/Informations/Informations";
import MainPanel from "../../components/MainPanel/MainPanel";
import SidePanel from "../../components/SidePanel/SidePanel";
import "./Dashboard.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import StudentContext from "../../context/student-context";
import { ObavjestenjaContextProvider } from "../../context/obavjestenje-context";
import { FaQuestion } from "react-icons/fa";
import functionalContext, { FunctionalContextProvider } from "../../context/functional-context";
import { PredmetContextProvider } from "../../context/predmet-context";
import { IspitContextProvider } from "../../context/ispit-context";

function Dashboard() {

    const navigate = useNavigate();
    const ctx = useContext(StudentContext);
    const functionalCtx = useContext(functionalContext);

    const [view, setView] = useState({ view: Informations });

    useEffect(() => {
        if (!ctx.isLoggedIn) {
            navigate("/login");
        }
        else {
            functionalCtx.setPopupText("Dobrodosli na studentski informacioni sistem.");
        }
    }, [ctx.isLoggedIn]);

    const MainViewHandler = (v) => {
        setView({ view: v });
    }

    return (
        <>
            <div className="popup" style={{ top: functionalCtx.popupTop }}>
                <span className="popup__questionmark">
                    <FaQuestion />
                </span>
                <p className="popup__text">
                    {functionalCtx.popupText}
                </p>
            </div>
            <NavBar />
            <ObavjestenjaContextProvider>
                <PredmetContextProvider>
                    <IspitContextProvider>
                        <div className="dashboard">

                            <SidePanel MainView={MainViewHandler} />

                            <MainPanel>
                                <view.view />
                            </MainPanel>
                        </div>
                    </IspitContextProvider>
                </PredmetContextProvider>
            </ObavjestenjaContextProvider>
        </>
    )
}

export default Dashboard;