import React, { useMemo, useState } from "react";
import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType, helpId } from '@rjsf/utils';
import { FormSchema, FieldType } from './types';
import { Colors } from '../../utils';
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import Table from "../../ui/table/Table";
import FormPreview from './FormPreview';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
    type: 'object',
    properties: {
        formName: { type: 'string', title: 'Nom du formulaire' },
        fields: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    type: { type: 'string', enum: ['text', 'number', 'select', 'textarea'] }
                }
            }
        }
    }
}

const FormBuilderCustom = (props: FieldProps) => {
    const [formName, setFormName] = useState<string>('')
    const [fields, setFields] = useState<any[]>([])
    const [selectedType, setSelectedType] = useState<string>('')
    const [currentTitle, setCurrentTitle] = useState<string>('')

    const form = useMemo(() => {

        return ({
            formName: formName,
            fields: fields

        })

    }, [formName, JSON.stringify(fields), selectedType, currentTitle])

    // const tableField = [
    //     {
    //         accessorKey : 'title'
    //         header : 'Nom du champ'
    //     },
    //     {
    //         accessorKey : 'type'
    //         header : 'Type choisie'
    //     },
    // ]
    const addField = () => {
        console.log('avant add:', {currentTitle, selectedType});
        if (currentTitle) {
            const newField = {
                type: selectedType,
                title: currentTitle,
                value: ""
            };
            setFields((fields) => [...fields, newField])
            // setCurrentTitle('')
            console.log('apres add:', {currentTitle, selectedType});
        }
    };

    const handleFormName = (e) => {
        setFormName(e.target.value)
    }
    const handleField = (value: string, index: number) => {
        const newFields = [...fields]

        if (fields[index].type == "number") {
            newFields[index].value = value.replace(/[^0-9]/g, "");
        } else {
            newFields[index].value = value
        }
        setFields(newFields)
    }
    const removeField = (indexToRemove: number) => {
        setFields(fields => fields.filter((_, index) => index !== indexToRemove))
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
            <div>
                <Input
                    label={"Form Name"}
                    value={formName}
                    onChange={handleFormName}
                />
            </div>
            <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
                    <SelectInput
                        value={selectedType}
                        onChange={(selectedOption: any) => {
                            setSelectedType(selectedOption.value);
                        }}
                        options={[
                            {value: 'text', label: 'Texte'},
                            {value: 'number', label: 'Nombre'},
                            {value: 'select', label: 'Liste déroulante'},
                            {value: 'textarea', label: 'Zone de texte'}
                        ]}
                    />
                    <Input
                        value={currentTitle}
                        onChange={(e) => setCurrentTitle(e.target.value)}
                        placeholder="Titre du champ"
                    />
                <Button
                    color={Colors.primary}
                    onClick={addField}
                >
                    +
                </Button>
                </div>
            </div>
             {/* <Table
            /> */}
            <div>
                <span>Preview : </span>
                <div className="border shadow-xl rounded-xl p-3">

                    <FormPreview formSchema={form} />
                </div>
            </div>
        </div>
    )
}

const uiSchema: UiSchema = { 'ui:field': 'geo' };

const fields: RegistryFieldsType = { geo: FormBuilderCustom };

export const FormBuilder = () => {
    return (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            fields={fields}
        />
    )
}

export default FormBuilder;
