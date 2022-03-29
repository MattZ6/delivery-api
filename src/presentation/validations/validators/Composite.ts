import { IValidation } from '@presentation/protocols';

export class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}

  validate(input: any) {
    const validation = this.validations
      .find(validation => !!validation.validate(input));

    return validation?.validate(input) ?? null;
  }
}
