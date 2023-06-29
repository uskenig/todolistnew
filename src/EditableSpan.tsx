import {ChangeEvent, FC, useState} from "react";


type EditableSpanPropsType = {
    title: string
    classes: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
        //setTitle(props.title)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }
    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        isEditMode
            ? <input value={title} onChange={changeItemTitle} onBlur={offEditMode} autoFocus/>
            : <span className={props.classes} onDoubleClick={onEditMode}>{props.title}</span>
    )
}