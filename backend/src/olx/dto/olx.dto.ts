import { Static, Type } from '@sinclair/typebox';

export const callbackBodyDto = Type.Object({
  code: Type.String(),
});

export type callbackBodyDto = Static<typeof callbackBodyDto>;

export const getAdvertsQuery = Type.Object({
  page: Type.String(),
  limit: Type.String(),
});

export type getAdvertsQuery = Static<typeof getAdvertsQuery>;
