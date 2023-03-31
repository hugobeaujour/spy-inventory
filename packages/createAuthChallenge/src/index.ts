import { generateNumber } from "shared/src/helpers/dynamo.helpers";
import { CreateAuthChallengeTriggerEvent } from "aws-lambda";
import { sendEmail } from "shared/src/services/ses.service";
import { getContent, getContentText } from "./mail.handler";

exports.handler = async function (event: CreateAuthChallengeTriggerEvent) {
    try {
        console.debug(JSON.stringify(event, null, 2));
        if (
            event.request.challengeName === "CUSTOM_CHALLENGE" &&
            event.request.userAttributes.email
        ) {
            const email = event.request.userAttributes.email;
            // Generate a random code for the custom challenge
            const randomDigits = generateNumber(6);

            // Send the custom challenge to the user
            await sendEmail(
                email,
                "Votre code à 6 chiffres",
                getContent(randomDigits),
                getContentText(randomDigits)
            );

            event.response.privateChallengeParameters = {};
            event.response.privateChallengeParameters.answer = randomDigits;
        }
        return event;
    } catch (error) {
        console.error("Generic error", error);
        throw "Create challenge error";
    }
};
