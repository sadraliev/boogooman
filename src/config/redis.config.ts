import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { z } from 'zod';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.config';
import { redisStore } from 'cache-manager-redis-yet';
import { Inject } from '@nestjs/common';

export const RedisSchema = z.object({
  REDIS_HOST: z.string().default('0.0.0.0'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().min(1, { message: 'REDIS_PASSWORD is required' }),
});

export const redisConfig = CacheModule.registerAsync({
  isGlobal: true,
  imports: [ConfigModule],

  useFactory: async (configService: ConfigService<EnvConfig>) => ({
    store: redisStore,
    url: `redis://:${configService.get('REDIS_PASSWORD')}@${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
    ttl: 60 * 1000 * 60,
  }),
  inject: [ConfigService],
});

export const InjectCache = () => Inject(CACHE_MANAGER);
export type RedisCache = Cache;
