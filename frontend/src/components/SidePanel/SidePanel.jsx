import { useContext, useState } from "react";
import Informations from "../../views/Informations/Informations";
import PrijavaIspita from "../../views/PrijavaIspita/PrijavaIspita";
import "./SidePanel.css";
import SidePanelDropdown from "./SidePanelDropdown";
import SidePanelDropdownItem from "./SidePanelDropdownItem";
import SidePanelHeader from "./SidePanelHeader";
import SidePanelProfile from "./SidePanelProfile";
import SidePanelTab from "./SidePanelTab";
import { FaHome, FaUser, FaGraduationCap } from "react-icons/fa";
import PolozeniIspiti from "../../views/PolozeniIspiti/PolozeniIspiti";
import StudentAbout from "../../views/StudentAbout/StudentAbout";
import StudentContext from "../../context/student-context";
import StudentRegister from "../../views/StudentRegister/StudentRegister";
import NovoObavjestenje from "../../views/NovoObavjestenje/NovoObavjestenje";
import NoviPredmet from "../../views/NoviPredmet/NoviPredmet";
import NoviIspit from "../../views/NoviIspit/NoviIspit";
import { PredmetContextProvider } from "../../context/predmet-context";

function SidePanel(props) {

    const ctx = useContext(StudentContext);

    const onViewChangeHandler = (view) => {
        props.MainView(view);
    }

    return (
        <div className="side-panel">
            <SidePanelProfile />

            <SidePanelHeader text="General" />
            <SidePanelTab icon={FaHome} title="Home" MainView={onViewChangeHandler} view={Informations} />

            {(ctx.role === "student") && (
                <>
                    <SidePanelHeader text="Student" />

                    <SidePanelDropdown icon={FaGraduationCap} title="Ispiti">
                        <SidePanelDropdownItem MainView={onViewChangeHandler} view={PrijavaIspita} title="Prijava ispita" />
                        <SidePanelDropdownItem MainView={onViewChangeHandler} view={PolozeniIspiti} title="Polozeni ispiti" />
                    </SidePanelDropdown>

                    <SidePanelTab icon={FaUser} title="Licni podaci" MainView={onViewChangeHandler} view={StudentAbout} />
                </>
            )}

            {(ctx.role === "profesor") && (
                <>
                    <SidePanelHeader text="Profesor" />

                    <SidePanelTab icon={FaUser} title="Licni podaci" MainView={onViewChangeHandler} view={StudentAbout} />
                    <SidePanelTab icon={FaGraduationCap} title="Registracija studenta" MainView={onViewChangeHandler} view={StudentRegister} />
                    <SidePanelTab icon={FaGraduationCap} title="Dodavanje obavjestenja" MainView={onViewChangeHandler} view={NovoObavjestenje} />
                    <SidePanelTab icon={FaGraduationCap} title="Dodavanje predmeta" MainView={onViewChangeHandler} view={NoviPredmet} />
                    <SidePanelTab icon={FaGraduationCap} title="Dodavanje ispita" MainView={onViewChangeHandler} view={NoviIspit} />
                    
                </>
            )}

        </div>
    );
}

export default SidePanel;