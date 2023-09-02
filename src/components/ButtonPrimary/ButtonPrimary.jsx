import s from "./styles.moudle.css"

export function ButtonPrimary({children, onClick, isDisabled}){
    return(
        <div>
            <button disabled={isDisabled} onClick={onClick} type="button" className={`btn btn-primary ${s.button}`}>
                {children}
            </button>
        </div>
    )
}