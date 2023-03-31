import { VerifyAuthChallengeResponseTriggerEvent } from "aws-lambda";

exports.handler = async function (event: VerifyAuthChallengeResponseTriggerEvent) {
    try {
        console.debug(JSON.stringify(event, null, 2));
        if (event.request.privateChallengeParameters.answer === event.request.challengeAnswer) {
            event.response.answerCorrect = true;
        } else {
            event.response.answerCorrect = false;
        }
        return event;
    } catch (error) {
        console.error("Generic error", error);
        throw "Define challenge error";
    }
};
