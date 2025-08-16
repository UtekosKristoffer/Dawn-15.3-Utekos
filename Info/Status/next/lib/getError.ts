/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */
export declare function sendError(res: NextApiResponse, statusCode: number, message: string): void;
interface LazyProps {
    req: IncomingMessage;
}
