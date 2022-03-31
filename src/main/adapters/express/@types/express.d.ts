declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    /**
     * Id of the authenticated client.
     * Get by access token.
     */
    client_id?: string;
    /**
     * Id of the authenticated deliveryman.
     * Get by access token.
     */
    deliveryman_id?: string;
  }
}
