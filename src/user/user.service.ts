import { Injectable } from '@nestjs/common';
import { Collections } from 'src/common/enum/collections.enum';
import { FirebaseService } from 'src/firebase/firebase.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { addProfileDto } from './dto/addProfile.dto';
import { Response } from 'express';
import { IActiveUser } from 'src/common/interfaces/activeUser.interface';
import { UserModel } from './model/user.model';
import { User } from './entities/user.entity';
import { ProfileModel } from 'src/profile/model/profile.model';

@Injectable()
export class UserService {
    constructor (
        private readonly firebaseService: FirebaseService,
        private readonly helpersService: HelpersService,
        private readonly userModel: UserModel,
        private readonly profileModel: ProfileModel,
    ) {}

    async addProfile (
        {ci, name, lastName, phone}: addProfileDto,
        {email}: IActiveUser,
        res: Response
    ) {
        try {
            let userDb: User = await this.userModel.getBy('email', email);

            if(!userDb) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }

            const profileId = await this.profileModel.handleAddProfile({
                ci,
                name,
                lastName,
                phone
            });

            await this.userModel.updateUser(userDb.id, {
                profile: profileId
            });

            return res.status(200).json({
                message: 'updated profile'
            });
        } catch (error) {
            this.helpersService.handleException (
                'user.service',
                'addProfile',
                error
            );
        }
    }

    async getUsers (
        res: Response
    ) {
        try {
            const usersDb = await this.userModel.getAll();

            return res.status(200).json({users: usersDb});
        } catch (error) {
            this.helpersService.handleException (
                'user.service',
                'getUsers',
                error
            );
        }
    }










    async handleSecureGetUsers () {
        try {
            const users = await this.firebaseService.get(Collections.USER);
            return users;
        } catch (error) {
            this.helpersService.handleException (
                'user.service',
                'handleGetUsers',
                error
            );
        }
    }
}
