import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User username. Max length - 50, min length - 4',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  public readonly username: string;

  @ApiProperty({ description: 'User email', example: 'test@test.com' })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description:
      'User password. Password must contain at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character. Max length - 250, min length - 8',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  public readonly password: string;

  @ApiProperty({
    description: 'User username. Max length - 25, min length - 4',
  })
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(25)
  public readonly name: string;
}
