import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { OTPModel } from 'src/DB/models';
import { OTPRepository } from 'src/DB/repository';

@Module({
    imports:[OTPModel],
  providers: [TasksService,OTPRepository],
})
export class TasksModule {}

