import { Module } from '@nestjs/common';
import { RunsController, AdminRunsController } from './runs.controller';
import { RunsService } from './runs.service';

@Module({
    controllers: [RunsController, AdminRunsController],
    providers: [RunsService]
})
export class RunsModule {}