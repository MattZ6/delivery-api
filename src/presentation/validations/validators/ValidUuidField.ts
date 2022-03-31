import { IValidation } from '@presentation/protocols';
import { InvalidUuidFieldError } from '@presentation/validations/errors';

export class ValidUuidFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: any) {
    const uuidRegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const isValidUuid = uuidRegExp.test(String(input[this.fieldName] ?? ''));

    console.log(input);
    console.log(isValidUuid);

    if (!isValidUuid) {
      return new InvalidUuidFieldError(this.fieldName);
    }

    return null;
  }
}
