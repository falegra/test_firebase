import { Inject, Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { Collections } from "src/common/enum/collections.enum";
import { Roles } from "src/common/enum/roles.enum";
import { HelpersService } from "src/helpers/helpers.service";
import { User } from "../entities/user.entity";
import { ProfileModel } from "src/profile/model/profile.model";

@Injectable()
export class UserModel {
    constructor (
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
        private readonly helpersService: HelpersService,
        private readonly profileModel: ProfileModel
    ) {}

    private toUser (
        snapshot: any
    ) {
        const {
            username,
            email,
            password,
            createdDate,
            isActive,
            verificationCode,
            role,
            profileImage,
            profile
        } = snapshot.data();

        const userDb: User = {
            id: snapshot.id,
            username,
            email,
            password,
            createdDate,
            isActive,
            verificationCode,
            role,
            profileImage,
            profile
        };

        return userDb;
    }

    async getAll () {
        try {
            const snapshots = await this.firebaseAdmin.firestore().collection(Collections.USER).get();
            let users: Array<User> = [];

            snapshots.forEach((snap) => {
                users.push(this.toUser(snap));
            });

            for(let i = 0; i < users.length ; i++) {
                delete users[i].password;
                delete users[i].createdDate;
                delete users[i].verificationCode;

                const p = await this.profileModel.handleGetProfile(users[i].profile + '');
                users[i].profile = p;
            }

            return users;
        } catch (error) {
            console.log(error.message);
        }
    }

    async secureGetAll () {
        try {
            const snapshots = await this.firebaseAdmin.firestore().collection(Collections.USER).get();
            let users: Array<User> = [];

            snapshots.forEach((snap) => {
                users.push(this.toUser(snap));
            });

            return users;
        } catch (error) {
            console.log(error.message);
        }
    }

    async getById (
        id: string
    ) {
        try {
            const snapshot = await this.firebaseAdmin.firestore().collection(Collections.USER)
                .doc(id)
                .get();

            const userDb: User = this.toUser(snapshot);

            delete userDb.password;
            delete userDb.createdDate;
            delete userDb.verificationCode;

            return userDb;
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'getById',
                error
            );
        }
    }

    async getBy (
        field: string,
        value: string | number
    ) {
        try {
            const snapshot = await this.firebaseAdmin.firestore().collection(Collections.USER)
                .where(`${field}`, '==', value)
                .get();

            if(snapshot.docs.length === 0) {
                return null;
            }

            const userDb = this.toUser(snapshot.docs[0]);

            delete userDb.password;
            delete userDb.createdDate;
            delete userDb.verificationCode;

            return userDb;
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'getByy',
                error
            );
        }
    }

    async secureGetBy (
        field: string,
        value: string | number
    ) {
        try {
            const snapshot = await this.firebaseAdmin.firestore().collection(Collections.USER)
                .where(`${field}`, '==', value)
                .get();

            if(snapshot.docs.length === 0) {
                return null;
            }

            const userDb = this.toUser(snapshot.docs[0]);

            return userDb;
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'getByy',
                error
            );
        }
    }

    async addUser (
        {email, password, username}: any
    ) {
        try {
            const createdDate = new Date().getTime() + '';
            const verificationCode = this.helpersService.generate_activation_code();

            await this.helpersService.send_email({
                to: email,
                subject: 'Activate your account',
                text: `Your verification code is ${verificationCode}`,
            });

            const docRef = await this.firebaseAdmin.firestore().collection(Collections.USER).add({
                email,
                username,
                password: this.helpersService.hash_password(password),
                createdDate,
                verificationCode,
                isActive: false,
                profileImage: null,
                role: Roles.CLIENT
            });

            return docRef;
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'addUser',
                error
            );
        }
    }

    async updateUser (
        id: string,
        data: Partial<any>
    ) {
        try {
            const snapshot = await this.getSnapshot(id);

            const updateUser = await snapshot.update(data);

            return true;
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'updateUser',
                error
            );
        }
    }

    async getSnapshot (
        id: string
    ) {
        try {
            const snapshot = await this.firebaseAdmin.firestore().collection(Collections.USER).doc(id);
            return snapshot;
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'getSnapshot',
                error
            );
        }
    }
}