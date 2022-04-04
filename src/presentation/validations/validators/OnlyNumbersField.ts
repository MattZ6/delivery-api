import { IValidation } from '@presentation/protocols';
import { OnlyNumbersFieldError } from '@presentation/validations/errors';

export class OnlyNumbersFieldValidation<F = string> implements IValidation {
  constructor(private readonly fieldName: F) {}

  validate(input: any) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    const onlyNumbersRegex = /^\d+$/;

    if (!onlyNumbersRegex.test(value)) {
      return new OnlyNumbersFieldError(String(this.fieldName));
    }

    return null;
  }
}
