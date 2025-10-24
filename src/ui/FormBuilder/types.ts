export type FieldType = 'text' | 'number' | 'select' | 'date' | 'textarea'

export interface FormField {
    type: FieldType,
    name: string,
    label: string,
    options?: string[],
    placeholder?: string

}

export interface FormSchema {
    formName: string,
    description?: string,
    fields: FormField[],
}

export interface RJSFSchema {
  type: 'object',
  title?: string,
  required?: string[],
  properties: {
    [key: string]: {
      type: string,
      title: string,
    };
  };
}
