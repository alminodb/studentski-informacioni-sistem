import MainPanelHeader from "../components/MainPanel/MainPanelHeader";

function StudentRegister() {
    return (
        <div className="student-register">
            <MainPanelHeader title="Dodavanje novog studenta u sistem" />

            <div className="main-view student-register__wrapper">
                <form>
                    <div className="student-register__name-lastname">
                        <input type="text" placeholder="Ime" />
                        <input type="text" placeholder="Prezime" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentRegister;