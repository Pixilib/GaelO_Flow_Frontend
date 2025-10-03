import { AutoRoutingPayload, Destination, Rule } from "../../utils/types";
import { Button, Modal } from "../../ui";
import { Colors } from "../../utils";
import CreateAutoRoutingForm from "./CreateAutoRoutingForm";
import { useState } from "react";
import { eventOptions } from "../types";
import { useTranslation } from "react-i18next";
import ModalRoutingTour from "../../tour/tours/ModalRoutingTour";

type CreateRootModalProps = {
    onClose: () => void;
    onSubmit: (payload: AutoRoutingPayload) => void;
}

const CreateRootModal = ({ onClose, onSubmit }: CreateRootModalProps) => {
    const [rules, setRules] = useState<{ rule: Rule, id: string }[]>([]);
    const [destinations, setDestinations] = useState<{ destination: Destination, id: string }[]>([]);
    const [autoRoutingPayload, setAutoRoutingPayload] = useState<AutoRoutingPayload>(
        {
            Name: "",
            EventType: eventOptions[0].value,
            Activated: true,
        } as AutoRoutingPayload);
    const { t } = useTranslation()
    const handlePayloadChange = (payload: AutoRoutingPayload) => {
        setAutoRoutingPayload(payload);
    }

    const handleSubmit = () => {
        const newPayload = {
            ...autoRoutingPayload,
            Router: {
                ...autoRoutingPayload.Router,
                Rules: rules.map(r => r.rule),
                Destinations: destinations.map(d => d.destination),
            }
        };
        setAutoRoutingPayload(newPayload);
        onSubmit(newPayload);
    }

    const handleRulesChange = (newRules: { rule: Rule, id: string }[]) => {
        setRules(newRules);
    }

    const handleDestinationChange = (newDestinations: { destination: Destination, id: string }[]) => {
        setDestinations(newDestinations);
    }

    return (
        <>
        <div className="w-full flex justify-end p-1">
            <ModalRoutingTour />
        </div>
            <Modal.Header onClose={onClose}>
                <Modal.Title>{t("autorouting.createAutoRooting.create-auto-routing")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateAutoRoutingForm
                    payload={autoRoutingPayload}
                    onPayloadChange={handlePayloadChange}
                    rules={rules}
                    onRulesChange={handleRulesChange}
                    destinations={destinations}
                    onDestinationsChange={handleDestinationChange}

                />
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-center items-center">
                    <Button
                        color={Colors.primary}
                        onClick={handleSubmit}
                        children={<p>{t("autorouting.createAutoRooting.submit")}</p>}
                    />
                </div>
            </Modal.Footer>
        </>
    );
}

export default CreateRootModal