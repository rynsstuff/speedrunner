import { IsEmail, IsString, Length, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 40, { message: 'Username cuman boleh 4 sampe 40 char' })
  username: string;

  @IsEmail({}, { message: 'Salah email format' })
  email: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Password harus ada minimal 1 uppercase, 1 lowercase, 1 number, and 1 special character',
    },
  )
  @Length(8, 40, { message: 'Password cuman boleh 8 sampe 40 char' })
  password: string;
}