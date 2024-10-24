import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './queue.module-definition';

@Module({})
export class QueueModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const bullBoardModules = options.queues.map((name) =>
      BullBoardModule.forFeature({
        name,
        adapter: BullMQAdapter,
      }),
    );

    const bullModules = options.queues.map((name) =>
      BullModule.registerQueue({ name }),
    );

    const flowProducers = (options.flows || []).map((flow) =>
      BullModule.registerFlowProducer({
        name: flow,
      }),
    );

    return {
      ...super.register(options),
      imports: [...bullModules, ...bullBoardModules, ...flowProducers],
      exports: [...bullModules, ...flowProducers],
    };
  }
}
