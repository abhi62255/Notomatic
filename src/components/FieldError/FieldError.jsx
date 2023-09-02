import s from "./styles.module.css"

export function FieldError({msg}){
    return(
        <span className={s.container}>{msg}</span>
    )
}