import { PostConfirmationTriggerEvent } from "aws-lambda";

exports.handler = async function (event: PostConfirmationTriggerEvent) {
    try {
        console.debug(JSON.stringify(event, null, 2));

        if (event.triggerSource === "PostConfirmation_ConfirmForgotPassword") {
            return event;
        }

        const email = event.request.userAttributes["cognito:email_alias"];

        // create in dynamodb

        return event;
    } catch (error) {
        console.error("Generic error", error);
        throw "Profil de partenaire échoué";
    }
};
