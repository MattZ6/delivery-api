import { JWTCryptographyProvider } from '@infra/providers/cryptography/cryptography/JWT';

import { authConfig } from '@main/config/env/auth';

export function makeCryptographyProvider() {
  return new JWTCryptographyProvider(
    authConfig.ACCESS_TOKEN_SECRET,
    authConfig.ACCESS_TOKEN_EXPIRES_IN_SECONDS
  );
}
