import { Static, Type } from '@sinclair/typebox';

export const CrossBody = Type.Object({
  files: Type.Array(Type.Any()),
  title: Type.String(),
  description: Type.String(),
  advertiserType: Type.String(),
  price: Type.String(),
  size: Type.String(),
  type: Type.String(),
  quantity: Type.String(),
  year: Type.String(),
  state: Type.String(),
  brand: Type.String(),
});

export type CrossBody = Static<typeof CrossBody>;
