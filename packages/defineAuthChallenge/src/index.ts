import { DefineAuthChallengeTriggerEvent } from "aws-lambda";

exports.handler = async function (event: DefineAuthChallengeTriggerEvent) {
    try {
        console.debug(JSON.stringify(event, null, 2));

        const [challenge] = event.request.session.reverse();
        const challengeAttempts = event.request.session.length;
        if (challenge) {
            if (challengeAttempts >= 3) {
                event.response.issueTokens = false;
                event.response.failAuthentication = true;
                return event;
            }
            if (challenge.challengeName === "CUSTOM_CHALLENGE") {
                event.response.issueTokens = challenge.challengeResult;
                event.response.failAuthentication = !challenge.challengeResult;
                return event;
            }
        }
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = "CUSTOM_CHALLENGE";

        return event;
    } catch (error) {
        console.error("Generic error", error);
        throw "Define challenge error";
    }
};
