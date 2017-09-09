import OperationalException from './OperationalException';

class ValidationException extends OperationalException {
  public constructor (message: string = 'Invalid request payload') {
    super(400, message);
  }
}

export default ValidationException;