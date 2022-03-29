import { ErrorModel } from '@domain/models/Error';

namespace ISaveErrorRepository {
  export type Input = Pick<ErrorModel, 'stack' | 'resource_uri' | 'http_method' | 'thrown_at'>;

  export type Output = ErrorModel;
}

interface ISaveErrorRepository {
  save(data: ISaveErrorRepository.Input): Promise<ISaveErrorRepository.Output>;
}

export { ISaveErrorRepository };
