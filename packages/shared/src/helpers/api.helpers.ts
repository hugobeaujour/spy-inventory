import { Return } from "./interfaces";

/*******
 * Return an object formatted for HTTP request with CORS using Lambda
 * @WARNING Please use the generic model as often as you can
 * @param statusCode Is the HTTP status returned in the response, 200/400/...
 * @param ret Is the body of the HTTP response sent to the client
 */
export function returnResponse<T>(statusCode: number, ret: T): Return {
    return {
        body: JSON.stringify(ret),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Max-Age": 86400,
        },
        statusCode: statusCode,
    };
}
