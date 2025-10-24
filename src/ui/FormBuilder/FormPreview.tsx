import Form from '@rjsf/core';
import { FormSchema } from './types';

const FormPreview = ({ formSchema }: { formSchema: FormSchema }) => {

    const dataRJSF = {// pour cree un formulaire ak rjsf
        type: 'object',
        title: formSchema.formName,
        properties: {}
    };


    formSchema.fields.forEach(champ => {
        dataRJSF.properties[champ.name] = { // ajoute tout les champs dans objet properties
            type: champ.type === 'number' ? 'number' : 'string',
            title: champ.label
        };
    });
    return (
        <Form schema={dataRJSF} />
    );
}

export default FormPreview;