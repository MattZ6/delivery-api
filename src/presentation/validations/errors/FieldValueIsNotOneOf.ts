import { ValidationError } from './Validation';

export class FieldIsNotOneOfValuesError extends ValidationError {
  constructor(fieldName: string, possibleValues: any[]) {
    const message = `The value of the ${fieldName} field is not one of ${possibleValues.join(
      ', '
    )} values.`;

    super(fieldName, 'invalid', message);
    super.message = message;
    super.field = fieldName;
  }
}
