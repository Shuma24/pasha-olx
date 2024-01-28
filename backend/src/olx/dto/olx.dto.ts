import { Static, Type } from '@sinclair/typebox';

export const callbackBodyDto = Type.Object({
  code: Type.String(),
});

export type callbackBodyDto = Static<typeof callbackBodyDto>;
