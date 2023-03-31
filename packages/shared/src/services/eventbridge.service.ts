import { EventBridge } from "aws-sdk";
import { PutEventsRequestEntry, PutEventsRequestEntryList } from "aws-sdk/clients/eventbridge";

const { EVENT_BUS_NAME, EVENT_BUS_SOURCE } = process.env;

const eventBridge: EventBridge = new EventBridge();

export const dispatchEvent = async (entries: PutEventsRequestEntryList) => {
    if (!EVENT_BUS_NAME || !EVENT_BUS_SOURCE) {
        console.error(
            "Missing event bus information, please fill EVENT_BUS_NAME and EVENT_BUS_SOURCE"
        );
        throw "Missing event bus information, please fill EVENT_BUS_NAME and EVENT_BUS_SOURCE";
    }
    const defaultPutEventRequest: PutEventsRequestEntry = {
        EventBusName: EVENT_BUS_NAME,
        Source: EVENT_BUS_SOURCE,
    };

    const data: PutEventsRequestEntry[] = entries.map((e): PutEventsRequestEntry => {
        return { ...defaultPutEventRequest, ...e };
    });

    const res = await eventBridge.putEvents({ Entries: data }).promise();
    console.info(
        `New events send : ${data.map((d) => d.DetailType)} ${JSON.stringify(res, null, 2)}`
    );
};
