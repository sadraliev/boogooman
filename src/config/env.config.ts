import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { RedisSchema } from './redis.config';

export const EnvSchema = z.object({
  ...RedisSchema.shape,
});

export type EnvConfig = z.infer<typeof EnvSchema>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {}
  }
}

export const envConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.development.local', '.env.development', '.env'],
  validate: (config: Record<string, unknown>) => {
    const parsedConfig = EnvSchema.parse(config);
    return parsedConfig;
  },
});
