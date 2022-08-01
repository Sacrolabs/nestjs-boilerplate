import {
    IsEmail,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignInDto {
    @ApiProperty({ description: "User email", example: "test@test.com" })
    @IsEmail()
    public readonly email: string;

    @ApiProperty({
        description:
            "User password. Password must contain at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character. Max length - 250, min length - 8",
    })
    @MinLength(8)
    @MaxLength(64)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "password is too weak",
    })
    public readonly password: string;

}
