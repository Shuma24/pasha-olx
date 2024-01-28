import { Type } from '@sinclair/typebox';

export const errorResponse = Type.Object({
  status: Type.Optional(Type.Boolean()),
  error: Type.String(),
});
