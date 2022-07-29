export class ServiceError extends Error {
  protected readonly _code: number;
  protected readonly _messageIsOptional: boolean;

  constructor(code: number, message?: string, messageIsOptional = true) {
    super(message);

    this._code = code;
    this._messageIsOptional = messageIsOptional;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public get serviceErrorCode(): number {
    return this._code;
  }

  public get serviceErrorMessageIsImportant(): boolean {
    return !this._messageIsOptional;
  }
}
