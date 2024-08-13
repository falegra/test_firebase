import { Body, Controller, Get, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { VerificationCodeDto } from './dto/verificationCode.dto';
import { LoginDto } from './dto/login.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ClientGuard } from './client.guard';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { IActiveUser } from 'src/common/interfaces/activeUser.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    register (
        @Body() createUser: CreateUserDto,
        @Res() res: Response
    ) {
        return this.authService.register(createUser, res);
    }

    @Post('verificationCode')
    verificationCode (
        @Body() verificationCode: VerificationCodeDto,
        @Res() res: Response
    ) {
        return this.authService.verificationCode(verificationCode, res);
    }

    @Post('login')
    login (
        @Body() login: LoginDto,
        @Res() res: Response
    ) {
        return this.authService.login(login, res);
    }

    @Post('uploadProfileImage')
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(ClientGuard)
    uploadProfileImage (
        @UploadedFiles() files: Array<Express.Multer.File>,
        @ActiveUser() activeUser: IActiveUser,
        @Res() res: Response
    ) {
        return this.authService.uploadProfileImage(files, activeUser, res);
    }
}
