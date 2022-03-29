import { IValidation } from '@presentation/protocols';
import { MinLengthFieldError } from '@presentation/validations/errors';

export class MinLengthFieldValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly min: number,
    private readonly withTrim: boolean = false
  ) {}

  validate(input: any) {
    let value = String(input[this.fieldName] ?? '');

    if (this.withTrim) {
      value = value.trim();
    }

    if (value.length < this.min) {
      return new MinLengthFieldError(this.fieldName, this.min);
    }

    return null;
  }
}
