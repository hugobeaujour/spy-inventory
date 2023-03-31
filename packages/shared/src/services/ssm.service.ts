import SSM from "aws-sdk/clients/ssm";

const ssm = new SSM({ region: "eu-west-3" });

export const getDocument = async (name: string, decrypt?: boolean) => {
    const params: SSM.GetParameterRequest = {
        Name: name,
        WithDecryption: decrypt || false,
    };
    const data = await ssm.getParameter(params).promise();

    return data.Parameter?.Value as string;
};
