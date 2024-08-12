import { IsDefined, IsString, Length } from "class-validator";

export class VerificationCodeDto {
    @IsDefined()
    @IsString()
    username: string;

    @IsDefined()
    @IsString()
    @Length(6, 6)
    verificationCode: string;
}