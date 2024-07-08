/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PROCESS } from '../entities/notification.entity';

export class processBody {
  @IsNotEmpty()
  @IsEnum(PROCESS)
  process: PROCESS;
}
