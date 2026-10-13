/** An error the API answers with on purpose: a status, a stable code for the client and a message. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const badRequest = (message: string, fields?: Record<string, string>) =>
  new ApiError(400, 'invalid_request', message, fields);
