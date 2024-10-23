import { z } from 'zod';

export const PostgresSchema = z.object({
  POSTGRES_HOST: z.string().default('0.0.0.0'),
  POSTGRES_PORT: z.string().transform(Number).default('15432'),
  POSTGRES_DB: z.string().default('postgres'),
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z
    .string()
    .min(1, { message: 'POSTGRES_PASSWORD is required' }),
});
