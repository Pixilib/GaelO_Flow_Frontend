import { AutoRoutingItems, AutoRoutingPayload } from "../utils/types";
import axios from "./axios";

export const getAutoRoutingItems = (): Promise<AutoRoutingItems[]> => {
    return axios
        .get("/api/autorouting")
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const createAutoRoutingItem = (
    payload: AutoRoutingPayload
): Promise<void> => {
    return axios
        .post("/api/autorouting", {
            Name: payload.name,
            EventType: payload.eventType,
            Activated: payload.activated,
            Router: {
                RuleCondition: payload.router.ruleCondition,
                Rules: payload.router.rules.map((rule) => ({
                    DicomTag: rule.dicomTag,
                    ValueRepresentation: rule.valueRepresentation,
                    Value: rule.value,
                    Condition: rule.condition,
                })),
                Destinations: payload.router.destinations.map((destination) => ({
                    Destination: destination.destination,
                    Name: destination.name,
                })),
            }
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}