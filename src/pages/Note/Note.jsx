import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteNote, updateNote } from "store/notes/notes-slice";

export function Note(props){
    const navigate = useNavigate()
    const {noteId} = useParams()
    const note = useSelector(store => store.noteSlice.noteList.find(note => note.id === noteId));
    const [ isEditable, setIsEditable] = useState(false)

    const dispatch = useDispatch()

    const submit = async (formValues) => {
      const updatedNote = await NoteAPI.updateById(noteId, formValues);  
      dispatch(updateNote(updatedNote))
      setIsEditable(false)

    };

    async function deleteNote_(){
        if (window.confirm("Delete Note")){
            NoteAPI.deleteById(noteId);
            dispatch(deleteNote(note));
            navigate("/");
        }
    }

    return(
        <>
            {Note && <NoteForm 
            title={isEditable ? "Edit Note": note.title}
            isEditable={isEditable}
            note = {note} 
            onClickEdit={()=> setIsEditable(!isEditable)} 
            onClickDelete={deleteNote_}
            onSubmit={isEditable && submit}
            />}
        </>
    )
}