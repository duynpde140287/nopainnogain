/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: string;

  @Prop({ required: true })
  userId: EpochTimeStamp;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ default: false })
  is_active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
