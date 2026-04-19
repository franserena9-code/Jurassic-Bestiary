import { z } from "zod";

export const DinoSchema = z.object({
  id: z.string().uuid(),
  diet: z.string(),
  name: z.string(),
  size: z.string(),
  image: z.string(),
  period: z.string(),
  region: z.string(),
  category: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const DinoResponseSchema = z.object({
  data: z.array(DinoSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }).optional(),
});