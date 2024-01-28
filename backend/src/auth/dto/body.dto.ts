import { Static, Type } from '@sinclair/typebox';

export const loginBody = Type.Object({
  login: Type.String({ minLength: 6, maxLength: 20 }),
  password: Type.String({ minLength: 6, maxLength: 20 }),
});

export type loginDTO = Static<typeof loginBody>;
