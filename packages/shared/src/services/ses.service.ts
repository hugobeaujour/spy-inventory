import { SES } from "aws-sdk";

const ses = new SES();

export async function sendEmail(
    address: string,
    subject: string,
    htmlContent: string,
    textContent?: string
) {
    const params: SES.SendEmailRequest = {
        Destination: { ToAddresses: [address] },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlContent,
                },
                ...(textContent && {
                    Text: {
                        Charset: "UTF-8",
                        Data: textContent,
                    },
                }),
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: "SpyInventory<noreply@spyinventory.me>",
    };
    const res = await ses.sendEmail(params).promise();

    return res;
}
