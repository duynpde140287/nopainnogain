/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

export enum PROCESS {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Schema({ collection: 'notifications', timestamps: true })
export class Notifications {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Prop({})
  alert: string;

  @Prop({})
  username: string;

  @Prop({ type: String, enum: PROCESS, default: PROCESS.PENDING })
  process: keyof PROCESS;
}

export const notificationSchema = SchemaFactory.createForClass(Notifications);
