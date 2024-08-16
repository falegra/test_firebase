import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { ClientGuard } from 'src/auth/client.guard';
import { addProfileDto } from './dto/addProfile.dto';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { IActiveUser } from 'src/common/interfaces/activeUser.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    @Post('addProfile')
    @UseGuards(ClientGuard)
    addProfile (
        @Body() addProfile: addProfileDto,
        @ActiveUser() activeUser: IActiveUser,
        @Res() res: Response
    ) {
        return this.userService.addProfile(addProfile, activeUser, res);
    }

    @Get('getUsers')
    @UseGuards(ClientGuard)
    getUsers (
        @Res() res: Response
    ) {
        return this.userService.getUsers(res);
    }
}
