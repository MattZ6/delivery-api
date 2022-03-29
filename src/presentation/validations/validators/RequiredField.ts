import { IValidation } from '@presentation/protocols';
import { RequiredFieldError } from '@presentation/validations/errors';

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: any) {
    if (!input[this.fieldName]) {
      return new RequiredFieldError(this.fieldName);
    }

    return null;
  }
}
