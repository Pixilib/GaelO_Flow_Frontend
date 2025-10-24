import React, { useState } from "react";
import Form from "@rjsf/core";
import { FormSchema, FormField, FieldType } from './types';
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import FormPreview from './FormPreview';

export const FormBuilder = () => 
{
    const [form, setForm] = useState<FormSchema>({
        formName: "",
        description: "",
        fields: []

    });
    const [field, setField] = useState<FormField>({
        type: 'text',
        name: '',
        label: '',
    });
    const addField= () => {
    }
    return (
    <div>
        <Input 
            value={form.formName}
            onChange={(e) => setForm({...form, formName: e.target.value})}
            placeholder= "Nom du formulaire"
        />
        <SelectInput
            value={field.type}
            onChange={(selectedOption) => {
                const selected = Array.isArray(selectedOption) ? selectedOption[0] : selectedOption;
                
                if (selected) {
                    setField({...field, type: selected.value as FieldType});
                }
            }}
            options={[
                { value: 'text', label: 'Texte' },
                { value: 'number', label: 'Nombre' },
                { value: 'select', label: 'Liste déroulante' },
                { value: 'date', label: 'Date' },
                { value: 'textarea', label: 'Zone de texte' }
            ]}
            placeholder="Choisir le type de champ"
            />
        <Input
            value={field.name}
            onChange={(e) => setField({...field, name: e.target.value})}
            placeholder=""
        />
        <Input
            value={field.label}
            onChange={(e) => setField({...field, label: e.target.value})}
            placeholder=""
        />
        {/* <Button 
            color={Colors.primary}
            onClick={addField}
            >
            +
        </Button> */}
        <FormPreview formSchema={form} />
    </div>
    )
}

export default FormBuilder;