/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterClientDto {
  @Transform(({ value }) => value.trim().replace(/\s+/g, ''))
  @IsNotEmpty()
  @Length(8, 20, { message: 'username nằm trong khoảng 8-20 kí tự!' })
  @IsString()
  username: string;

  @Transform(({ value }) => value.trim().replace(/\s+/g, ''))
  @IsNotEmpty()
  @Length(8, 20, { message: 'password nằm trong khoảng 8-20 kí tự!' })
  @IsString()
  password: string;

  @Transform(({ value }) => value.trim().replace(/\s+/g, ''))
  @IsEmail()
  email: string;
}
