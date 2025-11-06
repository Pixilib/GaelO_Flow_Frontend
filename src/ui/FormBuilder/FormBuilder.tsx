import React, { useState } from "react";
import Form from "@rjsf/core";
import { FormSchema, FormField, FieldType } from './types';
import { Colors } from '../../utils';
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import FormPreview from './FormPreview';

export const FormBuilder = () => 
{
    const [selectedType, setSelectedType] = useState<FieldType>('text');
    const [currentTitle, setCurrentTitle] = useState('')
    
    const [form, setForm] = useState<FormSchema>({
        formName: "",
        description: "",
        fields: []
    });
    const addField = () => {
        if (currentTitle) {
            const newField = {
                type: selectedType,
                title: currentTitle
            };
            setForm(prev => ({
            ...prev,
            fields: [...prev.fields, newField]
            }));
            setCurrentTitle('')
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
            <div>
                <h4>Nom du formulaire</h4>
                <Input 
                    value={form.formName}
                    onChange={(e) => setForm({...form, formName: e.target.value})}
                    placeholder="Ex: Formulaire de..."
                />
            </div>
            <div>
                <h4>Ajouter un champ</h4>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
                    <SelectInput
                        value={selectedType}
                        onChange={(selectedOption) => {
                            const selected = Array.isArray(selectedOption) ? selectedOption[0] : selectedOption;
                            if (selected) {
                                setSelectedType(selected.value as FieldType);
                            }
                        }}
                        options={[
                            { value: 'text', label: 'Texte' },
                            { value: 'number', label: 'Nombre' },
                            { value: 'select', label: 'Liste déroulante' },
                            { value: 'date', label: 'Date' },
                            { value: 'textarea', label: 'Zone de texte' }
                        ]}
                        placeholder="Type de champ"
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
            <div>
                <FormPreview formSchema={form} />
            </div>
        </div>
    )
}

export default FormBuilder;