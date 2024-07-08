/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(8, 20)
  username: string;

  @Length(8, 20)
  @IsString()
  password: string;
}
