import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { FolderMinus } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

export function NoteCreate(props){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (formValues) =>{

        const createdNote = await NoteAPI.create({...formValues,created_at: new Date().toLocaleDateString(), });

        dispatch(addNote(createdNote));
        navigate("/note/"+createdNote.id);
    }

    return(
        <>
            <NoteForm title="New Note" onSubmit={submit} />
        </>
    )
}