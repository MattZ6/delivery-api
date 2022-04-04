import { IValidation } from '@presentation/protocols';
import { DivergentValuesFieldError } from '@presentation/validations/errors';

export class CompareFieldsValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly fieldName: keyof I,
    private readonly fieldToCompareName: keyof I
  ) {}

  validate(input: I) {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new DivergentValuesFieldError(
        String(this.fieldName),
        String(this.fieldToCompareName)
      );
    }

    return null;
  }
}
