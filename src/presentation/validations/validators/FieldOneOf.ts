import { IValidation } from '@presentation/protocols';

import { FieldIsNotOneOfValuesError } from '../errors';

export class FieldOneOfValidation<I = unknown, O = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly fieldName: keyof I,
    private readonly possibleValues: O[]
  ) {}

  validate(input: I) {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return null;
    }

    const isOneOf = !this.possibleValues.some(
      possibleValue =>
        String(input[this.fieldName]).trim().toLocaleLowerCase() ===
        String(possibleValue).trim().toLowerCase()
    );

    if (isOneOf) {
      throw new FieldIsNotOneOfValuesError(
        String(this.fieldName),
        this.possibleValues
      );
    }

    return null;
  }
}
