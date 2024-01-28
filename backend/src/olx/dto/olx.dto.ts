import { Static, Type } from '@sinclair/typebox';

export const callbackQueryDto = Type.Object({
  code: Type.String(),
});

export type callBackQueryDto = Static<typeof callbackQueryDto>;
