import { Type } from '@sinclair/typebox';

export const loginResponse = Type.Object({
  status: Type.Boolean(),
  access_token: Type.String(),
});

export const meResponse = Type.Object({
  id: Type.Number(),
  login: Type.String(),
});
