import { IValidation } from '@presentation/protocols';
import { DivergentFieldsValuesError } from '@presentation/validations/errors';

export class CompareFieldsValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: any) {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new DivergentFieldsValuesError(
        this.fieldName,
        this.fieldToCompareName
      );
    }

    return null;
  }
}
