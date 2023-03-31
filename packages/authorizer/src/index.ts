import { APIGatewayRequestAuthorizerEvent, AuthResponse } from "aws-lambda";

export function generatePolicy(
    principalId: string,
    effect: string,
    resources: string[],
    userId?: string
) {
    const item: AuthResponse = {
        principalId: principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resources,
                },
            ],
        },
        context: {
            userId
        },
    };
    return item;
}

exports.handler = async function (event: APIGatewayRequestAuthorizerEvent): Promise<AuthResponse> {
    try {
        console.debug(JSON.stringify(event, null, 2));
        if (event.type !== "REQUEST") {
            // if it's not the right event
            console.warn("Not a right event type");
            return generatePolicy("no-transaction", "Deny", ["*"]);
        }

        if (!event.headers?.authorization) {
            // if there is no transaction in the headers
            console.warn("No token found");
            return generatePolicy("no-transaction", "Deny", ["*"]);
        }

        const accessToken = event.headers.authorization.replace("Bearer ", "");

        const cognitoUser = await findUserFromToken(accessToken);
        if (!cognitoUser) {
            console.info("Authorizer Deny : cannot get from cognito", accessToken);
            return generatePolicy("user-unknown", "Deny", ["*"]);
        }

        return generatePolicy(
            event.headers.authorization,
            "Allow",
            ["*"],
            cognitoUser.Username
        );
    } catch (error) {
        console.error("Generic error", error);
        return generatePolicy("wrong-input", "Deny", ["*"]);
    }
};
