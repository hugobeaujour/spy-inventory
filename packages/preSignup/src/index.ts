import { PreSignUpTriggerEvent } from "aws-lambda";

exports.handler = async function (event: PreSignUpTriggerEvent) {
    try {
        console.debug(JSON.stringify(event, null, 2));

        event.response.autoConfirmUser = true;
        event.response.autoVerifyEmail = true;

        return event;
    } catch (error) {
        console.error("Generic error", error);
        throw "Pre signup error";
    }
};
