import { PencilFill, TrashFill } from "react-bootstrap-icons"
import s from "./styles.module.css"
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary"
import { useState } from "react";
import { ValidatorService } from "services/validator";
import { FieldError } from "components/FieldError/FieldError";

const VALIDATOR = {
    title: (value)=>{
        return ValidatorService.min(value, 3) || ValidatorService.max(value, 20)
    },
    content : (value)=>{
        return ValidatorService.min(value, 3)
    }
}


export function NoteForm({isEditable=true, note, title, onClickEdit, onClickDelete, onSubmit}){

    const [formvalues, setFormValues] = useState({
        title: note?.title || " ",
        content: note?.content
    });
    const [formError, setFormError] = useState({title: note?.title ? undefined : true, content: note?.content ? undefined : true});

    
    const updateFormValues = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setFormValues({...formvalues, [name]: value});
        validate(name, value);

    };

    const validate = (fieldName, fieldvalue) =>{
        setFormError({...formError, [fieldName]: VALIDATOR[fieldName](fieldvalue)})

    };

    const hasError = () => {
        for (const feildName in formError) {
            if (formError[feildName]){
                return true
            }
        }
        return false

    }



    const actionIcons=(
        <>
            <div className="col-1">
                { onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon}/> }
            </div>
            <div className="col-1">
            { onClickDelete && <TrashFill onClick={onClickDelete} className={s.icon}/> }
            </div>
        </>
    );

    const titleInput=(
        <div className="mb-5">
            <label className="form-label">Title</label>
            <input onChange={updateFormValues} type="text" name="title" className="form-control" value={formvalues.title} />
            <FieldError msg={formError.title}></FieldError>
        </div>
    );

    const contentInput=(
        <div className="mb-5">
            <label className="form-label">Content</label>
            <textarea onChange={updateFormValues} type="text" name="content" className="form-control" row="5" value={formvalues.content} />
            <FieldError msg={formError.content}></FieldError>
        </div>
    );

    const submitBtn=(
        <div className={s.submit_btn}>
            { onSubmit && <ButtonPrimary isDisabled={hasError()} onClick={()=>onSubmit(formvalues)}>Submit</ButtonPrimary> }
        </div>
    );




    return(
        <div className={s.container}>
            <div className="row justify-content-space-between">
                <div className="col-10">
                    <h2 className="mb-3">{title}</h2>
                </div>
                {actionIcons}
            </div>

            <div className={`mb-3 ${s.title_input_container}`}>
                {isEditable && titleInput}
            </div>
            <div className="mb-3">{isEditable ? contentInput : <pre>{note.content}</pre>}</div>
            {submitBtn}
        </div>
    );
}