import axios from "axios";
import MainPanelHeader from "../../components/MainPanel/MainPanelHeader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, FontSize } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { createRef, useContext, useState } from "react";
import FunctionalContext from "../../context/functional-context";

function NovoObavjestenje() {

    const [title, setTitle] = useState("");
    const [notificationText, setNotificationText] = useState("");

    const functionalCtx = useContext(FunctionalContext);

    axios.defaults.withCredentials = true;
    const newNotificationHandler = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3001/obavjestenja/dodaj", {
            "naslov": title,
            "obavjestenje": notificationText
        }).then(({ data }) => {
            if (!data.insertId) {
                functionalCtx.setPopupText(data)
            }
            else {
                functionalCtx.setPopupText("Uspjesno ste dodali obavjestenje \"" + title + "\"");
            }
        })
    }

    return (
        <div className="main-view novo-obavjestenje">
            <MainPanelHeader title="Dodaj novo obavjestenje" />

            <form className="new-stuff__form" onSubmit={newNotificationHandler}>
                <label>Naslov</label>
                <input type="text" placeholder="Naslov" onChange={(event) => { setTitle(event.target.value) }} />
                {/* <label dangerouslySetInnerHTML={{ __html: ckText }}></label> */}
                <label>Text</label>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: {
                            items: ['undo', 'redo', '|', 'bold', 'italic', '|', 'fontsize'],
                        },
                        plugins: [
                            Bold, Essentials, Italic, Paragraph, Undo, FontSize
                        ]

                    }}
                    onChange={(event, editor) => {

                        setNotificationText(editor.getData());

                    }}
                />
                <button type="submit" className="new-stuff__button">Dodaj</button>
            </form>
        </div>
    );
}

export default NovoObavjestenje;