import { AWSError, CognitoIdentityServiceProvider } from "aws-sdk";
import {
    UpdateUserAttributesRequest,
    UpdateUserAttributesResponse,
    VerifyUserAttributeRequest,
    VerifyUserAttributeResponse,
} from "aws-sdk/clients/cognitoidentityserviceprovider";

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({});

/*******
 * Used only in the authorizer for now
 */
export async function findUserFromToken(accessToken: string) {
    try {
        const params: CognitoIdentityServiceProvider.GetUserRequest = {
            AccessToken: accessToken,
        };
        const result = await cognitoIdentityServiceProvider.getUser(params).promise();

        return result;
    } catch (error) {
        if ((error as AWSError).message !== "Access Token has expired") {
            console.error("findUserFromToken error", (error as AWSError).message);
        }
        return null;
    }
}

/******
 * Change the email of a user
 * @param email As the new email
 */
export async function updateAttributeEmail(
    accessToken: string,
    email: string
): Promise<UpdateUserAttributesResponse> {
    const params: UpdateUserAttributesRequest = {
        AccessToken: accessToken,
        UserAttributes: [
            {
                Name: "email",
                Value: email,
            },
        ],
    };
    const result = await cognitoIdentityServiceProvider.updateUserAttributes(params).promise();

    return result;
}

/******
 * Verify the attribute "email" for this user
 * @param code The 6 digit code received on the new email
 */
export async function verifyAttributeEmail(
    accessToken: string,
    code: string
): Promise<VerifyUserAttributeResponse> {
    const params: VerifyUserAttributeRequest = {
        AccessToken: accessToken,
        AttributeName: "email",
        Code: code,
    };
    const result = await cognitoIdentityServiceProvider.verifyUserAttribute(params).promise();

    return result;
}
