import { AutoRoutingPayload } from "../../utils/types";
import { Button, Modal } from "../../ui";
import { Colors } from "../../utils";
import CreateAutoRoutingForm from "./CreateAutoRoutingForm";
import { useState } from "react";
import { eventOptions } from "../types";

type CreateRootModalProps = {
    show: boolean;
    onClose: () => void;
    onSubmit: (payload: AutoRoutingPayload) => void;
}

const CreateRootModal = ({ show, onClose, onSubmit }: CreateRootModalProps) => {
    const [AutoRoutingPayload, setAutoRoutingPayload] = useState<AutoRoutingPayload>(
        {
            Name: "",
            EventType: eventOptions[0].value,
            Activated: true,
        } as AutoRoutingPayload);

    const handlePayloadChange = (payload: AutoRoutingPayload) => {
        setAutoRoutingPayload(payload);
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            size="xl"
        >
            <Modal.Header onClose={onClose}>
                <Modal.Title>Create Auto-Rooting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateAutoRoutingForm
                    payload={AutoRoutingPayload}
                    onPayloadChange={handlePayloadChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-center items-center">
                    <Button
                        color={Colors.primary}
                        onClick={() => console.log(AutoRoutingPayload)}
                        children={<p>Submit</p>}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateRootModal