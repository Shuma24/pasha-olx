import { Static, Type } from '@sinclair/typebox';

export const callbackBodyDto = Type.Object({
  access_token: Type.String(),
  expires_in: Type.Number(),
  token_type: Type.String(),
  scope: Type.String(),
  refresh_token: Type.String(),
});

export type callbackBodyDto = Static<typeof callbackBodyDto>;
