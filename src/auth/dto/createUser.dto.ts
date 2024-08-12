import { IsBoolean, IsDefined, IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    username: string;

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @Length(6)
    password: string;
}