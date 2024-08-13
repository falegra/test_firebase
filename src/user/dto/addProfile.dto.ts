import { IsDefined, IsString, Length } from "class-validator";

export class addProfileDto {
    @IsDefined()
    @IsString()
    @Length(3)
    name: string;

    @IsDefined()
    @IsString()
    @Length(3)
    lastName: string;

    @IsDefined()
    @IsString()
    @Length(11, 11)
    ci: string;

    @IsDefined()
    @IsString()
    @Length(8)
    phone: string;
}