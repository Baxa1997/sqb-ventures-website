/** A failed call to ucode, with what the platform answered. */
export class UcodeError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'UcodeError';
  }

  /** Errors worth retrying: timeouts, network failures, 429 and 5xx. */
  get retryable() {
    return this.status === 0 || this.status === 408 || this.status === 429 || this.status >= 500;
  }
}
