import { Injectable } from '@nestjs/common';
import { HelpersService } from 'src/helpers/helpers.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';
import { UserModel } from 'src/user/model/userModel.model';
import { VerificationCodeDto } from './dto/verificationCode.dto';
import { LoginDto } from './dto/login.dto';
import { join, resolve } from 'path';
import { FirebaseService } from 'src/firebase/firebase.service';
import { unlinkSync } from 'fs';
import { IActiveUser } from 'src/common/interfaces/activeUser.interface';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly helpersService: HelpersService,
        private readonly userModel: UserModel,
        private readonly firebaseService: FirebaseService
    ) {}

    async register (
        {email, password, username}: CreateUserDto,
        res: Response
    ) {
        try {
            let userDb = await this.userModel.getBy('email', email);

            if(userDb) {
                return res.status(400).json({
                    message: 'e-mail already exists'
                });
            }

            userDb = await this.userModel.getBy('username', username);

            if(userDb) {
                return res.status(400).json({
                    message: 'username already exists'
                });
            }

            const saved_user = await this.userModel.addUser({
                email,
                password,
                username
            });

            if(!saved_user) {
                return res.status(400).json({
                    message: 'something went wrong'
                });
            }

            return res.status(201).json({
                message: 'user created successfully',
            });
        } catch (error) {
            this.helpersService.handleException (
                'auth.service',
                'register',
                error
            );
            return res.status(400).json({
                message: 'something went wrong'
            });
        }
    }

    async verificationCode (
        {username, verificationCode}: VerificationCodeDto,
        res: Response
    ) {
        try {
            let userDb = await this.userModel.getBy('username', username);

            if(!userDb) {
                userDb = await this.userModel.getBy('email', username);
            }

            if(!userDb) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }

            if(userDb.data.verificationCode !== verificationCode) {
                return res.status(400).json({
                    message: 'incorrect verification code'
                });
            }

            await this.userModel.updateUser(userDb.id, {
                isActive: true,
                verificationCode: null
            });

            return res.status(200).json({
                message: 'user activated successfully'
            });
        } catch (error) {
            this.helpersService.handleException (
                'auth.service',
                'verificationCode',
                error
            );
            return res.status(400).json({
                message: 'something went wrong'
            });
        }
    }

    async login (
        {username, password}: LoginDto,
        res: Response
    ) {
        try {
            let userDb = await this.userModel.getBy('username', username);

            if(!userDb) {
                userDb = await this.userModel.getBy('email', username);
            }

            if(!userDb) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }

            if(!userDb.data.isActive) {
                return res.status(400).json({
                    message: 'user is not active'
                });
            }

            if(!this.helpersService.verify_password(password, userDb.data.password)) {
                return res.status(400).json({
                    message: 'incorrect credentials'
                });
            }

            const token = this.helpersService.generate_token({
                id: userDb.id,
                email: userDb.data.email,
            }, false);

            return res.status(200).json({
                token
            });
        } catch (error) {
            this.helpersService.handleException (
                'auth.service',
                'login',
                error
            );
            return res.status(400).json({
                message: 'something went wrong'
            });
        }
    }

    async uploadProfileImage (
        files: Array<Express.Multer.File>,
        {email}: IActiveUser,
        res: Response
    ) {
        try {
            if(!files) {
                return res.status(400).json({
                    message: 'no files uploaded'
                });
            }

            const userDb = await this.userModel.getBy('email', email);

            if(!userDb) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }

            const savedFile = await this.helpersService.saveFiles(files, 'uploads');

            if(savedFile.length === 0) {
                return res.status(400).json({
                    message: 'something went wrong'
                });
            }

            console.log(savedFile);

            await new Promise((resolve) => {
                setTimeout(resolve, 6000);
            });

            const filePath = join(__dirname, `../../uploads${savedFile[0].url}`);

            await this.firebaseService.uploadFile(filePath);

            unlinkSync(filePath);

            await this.userModel.updateUser(userDb.id, {
                profileImage: savedFile[0].url
            });

            return res.status(200).json({
                message: 'file uploaded successfully'
            });
        } catch (error) {
            this.helpersService.handleException (
                'auth.service',
                'upload',
                error
            );
            return res.status(400).json({
                message: 'something went wrong'
            });
        }
    }
}
