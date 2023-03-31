/*******
 * What the lambda should always return for a HTTP request
 */
export interface Return {
    body: string;
    headers: {
        "Access-Control-Allow-Origin": string;
        "Access-Control-Allow-Credentials": boolean;
        "Access-Control-Allow-Headers": string;
        "Access-Control-Max-Age": number;
    };
    statusCode: number;
}
