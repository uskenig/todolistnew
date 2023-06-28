import {ChangeEvent, FC, useState} from "react";


type EditableSpanPropsType = {
    title: string
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => setIsEditMode(false)
    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        isEditMode
            ? <input
                autoFocus
                value={props.title}
                onChange={changeItemTitle}
                onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}