import { IValidation } from '@presentation/protocols';
import { MinValueFieldError } from '@presentation/validations/errors';

export class MinValueFieldValidation<F = string> implements IValidation {
  constructor(private readonly fieldName: F, private readonly min: number) {}

  validate(input: any) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    if (Number(value) < this.min) {
      return new MinValueFieldError(String(this.fieldName), this.min);
    }

    return null;
  }
}
