import { ClientNotFoundWithProvidedIdError } from '@domain/errors';
import { IFindAllDeliveriesFromClientUseCase } from '@domain/usecases/delivery/FindAllFromClient';

import { FindAllDeliveriesFromClientUseCase } from '@application/usecases/delivery/FindAllFromClient';

import { makeDeliveryMock, makeErrorMock } from '../../../domain';
import {
  CheckIfClientExistsByIdRepositorySpy,
  FindAllDeliveriesFromClientRepositorySpy,
  makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock,
  makeFindAllDeliveriesFromClientUseCaseInputMock,
} from '../../mocks';

let checkIfClientExistsByIdRepositorySpy: CheckIfClientExistsByIdRepositorySpy;
let findAllDeliveriesFromClientUseCaseDefaultSortBy: IFindAllDeliveriesFromClientUseCase.SortBy;
let findAllDeliveriesFromClientUseCaseDefaultOrder: IFindAllDeliveriesFromClientUseCase.Order;
let findAllDeliveriesFromClientUseCaseDefaultLimit: IFindAllDeliveriesFromClientUseCase.Limit;
let findAllDeliveriesFromClientUseCaseDefaultOffset: IFindAllDeliveriesFromClientUseCase.Offset;
let findAllDeliveriesFromClientRepositorySpy: FindAllDeliveriesFromClientRepositorySpy;

let findAllDeliveriesFromClientUseCase: FindAllDeliveriesFromClientUseCase;

describe('FindAllDeliveriesFromClientUseCase', () => {
  beforeEach(() => {
    checkIfClientExistsByIdRepositorySpy =
      new CheckIfClientExistsByIdRepositorySpy();
    findAllDeliveriesFromClientUseCaseDefaultSortBy =
      makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock();
    findAllDeliveriesFromClientUseCaseDefaultOrder =
      makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock();
    findAllDeliveriesFromClientUseCaseDefaultLimit =
      makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock();
    findAllDeliveriesFromClientUseCaseDefaultOffset =
      makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock();
    findAllDeliveriesFromClientRepositorySpy =
      new FindAllDeliveriesFromClientRepositorySpy();

    findAllDeliveriesFromClientUseCase = new FindAllDeliveriesFromClientUseCase(
      checkIfClientExistsByIdRepositorySpy,
      findAllDeliveriesFromClientUseCaseDefaultSortBy,
      findAllDeliveriesFromClientUseCaseDefaultOrder,
      findAllDeliveriesFromClientUseCaseDefaultLimit,
      findAllDeliveriesFromClientUseCaseDefaultOffset,
      findAllDeliveriesFromClientRepositorySpy
    );
  });

  it('should call CheckIfClientExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfClientExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    await findAllDeliveriesFromClientUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.client_id,
    });
  });

  it('should throw if CheckIfClientExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfClientExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    const promise = findAllDeliveriesFromClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw ClientNotFoundWithProvidedIdError if CheckIfClientExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfClientExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    const promise = findAllDeliveriesFromClientUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      ClientNotFoundWithProvidedIdError
    );
  });

  it('should call FindAllDeliveriesFromClientRepository once with correct values', async () => {
    const findAllFromClientSpy = jest.spyOn(
      findAllDeliveriesFromClientRepositorySpy,
      'findAllFromClient'
    );

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    await findAllDeliveriesFromClientUseCase.execute(input);

    expect(findAllFromClientSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromClientSpy).toHaveBeenCalledWith({
      client_id: input.client_id,
      sort_by: input.sort_by,
      order: input.order,
      take: input.limit,
      skip: input.offset,
    });
  });

  it('should call FindAllDeliveriesFromClientRepository with default values if no input', async () => {
    const findAllFromClientSpy = jest.spyOn(
      findAllDeliveriesFromClientRepositorySpy,
      'findAllFromClient'
    );

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    await findAllDeliveriesFromClientUseCase.execute({
      client_id: input.client_id,
    });

    expect(findAllFromClientSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromClientSpy).toHaveBeenCalledWith({
      client_id: input.client_id,
      sort_by: findAllDeliveriesFromClientUseCaseDefaultSortBy,
      order: findAllDeliveriesFromClientUseCaseDefaultOrder,
      take: findAllDeliveriesFromClientUseCaseDefaultLimit,
      skip: findAllDeliveriesFromClientUseCaseDefaultOffset,
    });
  });

  it('should throw if FindAllDeliveriesFromClientRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllDeliveriesFromClientRepositorySpy, 'findAllFromClient')
      .mockRejectedValueOnce(errorMock);

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    const promise = findAllDeliveriesFromClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return available deliveries on success', async () => {
    const deliveriesMock = [
      makeDeliveryMock(),
      makeDeliveryMock(),
      makeDeliveryMock(),
      makeDeliveryMock(),
    ];

    jest
      .spyOn(findAllDeliveriesFromClientRepositorySpy, 'findAllFromClient')
      .mockResolvedValueOnce(deliveriesMock);

    const input = makeFindAllDeliveriesFromClientUseCaseInputMock();

    const output = await findAllDeliveriesFromClientUseCase.execute(input);

    expect(output).toEqual(deliveriesMock);
  });
});
