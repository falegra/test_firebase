import { Injectable } from '@nestjs/common';
import { Collections } from 'src/common/enum/collections.enum';
import { FirebaseService } from 'src/firebase/firebase.service';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class UserService {
    constructor (
        private readonly firebaseService: FirebaseService,
        private readonly helpersService: HelpersService
    ) {}

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
