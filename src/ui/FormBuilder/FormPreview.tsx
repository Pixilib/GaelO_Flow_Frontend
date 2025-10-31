import Form from '@rjsf/core';
import { FormSchema } from './types'; 
import validator from '@rjsf/validator-ajv8';

const FormPreview = ({ formSchema }: { formSchema: FormSchema }) => {

    const dataRJSF: any = {// pour cree un formulaire ak rjsf
        type: 'object',
        title: '',
        properties: {}
    };

    formSchema.fields.forEach(champ => {
    let fieldSchema: any = {
        title: champ.title
    };
    switch(champ.type) {
        case 'number':
            fieldSchema.type = 'number';
            break;
        case 'date':
            fieldSchema.type = 'string';
            fieldSchema.format = 'date';
            break;
        case 'textarea':
            fieldSchema.type = 'string';
            fieldSchema.format = 'textarea';
            break;
        case 'select':
            fieldSchema.type = 'string';
            fieldSchema.enum = ['Option 1', 'Option 2'];
            break;
        default:
            fieldSchema.type = 'string';
    }
    dataRJSF.properties[champ.title] = fieldSchema;
    dataRJSF
    });
    return (
        <Form schema={dataRJSF} validator={validator}/>
    );
}

export default FormPreview;