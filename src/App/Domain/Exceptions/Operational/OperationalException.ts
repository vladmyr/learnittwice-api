import AbstractException from '../AbstractException';

class OperationalException extends AbstractException {
  private _statusCode: number;

  public constructor (statusCode: number, message?: string) {
    super(message);
    this._statusCode = statusCode;
  }

  public get statusCode () {
    return this._statusCode;
  }
}

export default OperationalException;