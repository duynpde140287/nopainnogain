/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim().replace(/\s+/g, ''))
  @IsNotEmpty()
  @Length(8, 20)
  @IsString()
  username: string;

  @Transform(({ value }) => value.trim().replace(/\s+/g, ''))
  @IsNotEmpty()
  @Length(8, 20)
  @IsString()
  password: string;

  @Transform(({ value }) => value.trim().replace(/\s+/g, ''))
  @IsEmail()
  email: string;
}
