import { IValidation } from '@presentation/protocols';
import { MaxValueFieldError } from '@presentation/validations/errors';

export class MaxValueFieldValidation<F = string> implements IValidation {
  constructor(private readonly fieldName: F, private readonly max: number) {}

  validate(input: any) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    if (Number(value) > this.max) {
      return new MaxValueFieldError(String(this.fieldName), this.max);
    }

    return null;
  }
}
