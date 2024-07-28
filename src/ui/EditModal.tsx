import React from 'react';
import FormModal from './FormModal';
import Spinner from './Spinner';

export type EditModalSubmitParams<P> = {
    id: string;
    payload: P;
};

type EditModalProps<T, P> = {
    title: string;
    data: T ;
    show: boolean;
    onClose: () => void;
    onSubmit: (params: EditModalSubmitParams<P>) => void;
    FormComponent: React.ComponentType<EditModalFormProps<T, P>>;
    children?: React.ReactNode;
};

export type EditModalFormProps<T, P> = {
    data: T;
    onSubmit: (params: EditModalSubmitParams<P>) => void;
    onCancel: () => void;
};

const EditModal = <T, P>({
    title,
    data,
    show,
    onClose,
    onSubmit,
    FormComponent,
    children
}: EditModalProps<T, P>) => {

    const handleFormSubmit = (params: EditModalSubmitParams<P>) => {
        console.log('EditModal handleFormSubmit', params);
        onSubmit(params);
    };

    return (
        <FormModal
            title={title}
            onClose={onClose}
            show={show}
        >
            {data ?
                <FormComponent
                    data={data}
                    onSubmit={handleFormSubmit}
                    onCancel={onClose}
                /> :
                <Spinner />}
            {children}
        </FormModal>
    );
}

export default EditModal;