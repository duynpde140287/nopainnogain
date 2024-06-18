/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserEntity {}
