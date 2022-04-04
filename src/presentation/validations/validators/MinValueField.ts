import { IValidation } from '@presentation/protocols';
import { MinValueFieldError } from '@presentation/validations/errors';

export class MinValueFieldValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly fieldName: keyof I,
    private readonly min: number
  ) {}

  validate(input: I) {
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
