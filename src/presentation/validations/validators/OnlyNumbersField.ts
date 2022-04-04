import { IValidation } from '@presentation/protocols';
import { OnlyNumbersFieldError } from '@presentation/validations/errors';

export class OnlyNumbersFieldValidation<I = unknown> implements IValidation<I> {
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
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
