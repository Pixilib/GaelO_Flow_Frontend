import React from 'react';
import FormModal from './FormModal';

export type EditModalSubmitParams<P> = {
    id: string;
    payload: P;
};

type EditModalProps<T, P> = {
    title: string;
    data: T | undefined;
    show: boolean;
    onClose: () => void;
    onSubmit: (params: EditModalSubmitParams<P>) => void;
    FormComponent: React.ComponentType<EditModalFormProps<T, P>>;
};

export type EditModalFormProps<T, P> = {
    data: T | undefined;
    onSubmit: (params: EditModalSubmitParams<P>) => void;
    onCancel: () => void;
};

const EditModal = <T, P>({
    title,
    data,
    show,
    onClose,
    onSubmit,
    FormComponent
}: EditModalProps<T, P>) => {
    
    const handleFormSubmit = (params: EditModalSubmitParams<P>) => {
        onSubmit(params);
        onClose();
    };

    return (
        <FormModal
            title={title}
            onClose={onClose}
            show={show}
        >
            <FormComponent
                data={data}
                onSubmit={handleFormSubmit}
                onCancel={onClose}
            />
        </FormModal>
    );
}

export default EditModal;