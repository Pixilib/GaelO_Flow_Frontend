import { ChangeEvent, useEffect, useState } from 'react'
import Input from '../Input'

const EditableCell = ({
    getValue,
    row: { id: rowId },
    column: {
        columnDef: {
            id: columnId,
            style,
            editionProperties: {
                type = undefined,
                minLength = undefined,
                maxLength = undefined,
                min = undefined,
                max = undefined,
                placeholder = undefined,
                disabled = undefined,
            } = {},
            isEditable = false
        }
    },
    table
}: any) => {
    if (!isEditable) return getValue()
    // Update the state of the cell normally
    let initialValue = getValue()

    const [value, setValue] = useState(initialValue)

    const onChange = (e : ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value // Treat empty string as null value
        setValue(value)
    }
    // Update the external data when the input is blurred
    const onBlur = () => {
        table.options.meta?.updateData(rowId, columnId, value)
    }

    // If the initialValue is changed external, sync it up with state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <Input
            className='tw-rounded-full tw-border-2 tw-border-solid tw-text-secondary tw-py-3 tw-px-6 tw-text-xl tw-min-h-[4rem] tw-border-offwhite focus:tw-border-primary focus:tw-shadow-none placeholder:tw-text-secondary'
            style={style}
            disabled={disabled}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            max={max}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={onChange}
            onClick={(e) => {
                e.stopPropagation()
            }}
            onBlur={onBlur}
        />
    )
}

export default EditableCell