import { ValidationError } from '@presentation/validations/errors';

export interface IValidation {
  validate(input: any): ValidationError | null;
}
