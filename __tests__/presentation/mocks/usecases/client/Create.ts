import { ICreateClientUseCase } from '@domain/usecases/clients/Create';

import { makeClientMock } from '../../../../domain';

export function makeCreateClientUseCaseOutputMock(): ICreateClientUseCase.Output {
  return makeClientMock();
}

export class CreateClientUseCaseSpy implements ICreateClientUseCase {
  async execute(
    _: ICreateClientUseCase.Input
  ): Promise<ICreateClientUseCase.Output> {
    return makeCreateClientUseCaseOutputMock();
  }
}
