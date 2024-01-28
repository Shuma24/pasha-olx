import { Static, Type } from '@sinclair/typebox';

export const updateAdminBody = Type.Object({
  login: Type.Optional(Type.String({ minLength: 6, maxLength: 20 })),
  password: Type.Optional(Type.String({ minLength: 6, maxLength: 20 })),
});

export type updateAdminDTO = Static<typeof updateAdminBody>;
