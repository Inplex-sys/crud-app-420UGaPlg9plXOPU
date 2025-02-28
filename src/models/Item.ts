import Prisma from '@prisma/client';

export type CreateItemDTO = Omit<Prisma.Item, "id">;
export type UpdateItemDTO = Partial<CreateItemDTO>;
