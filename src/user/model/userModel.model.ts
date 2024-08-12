import { Inject, Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { Collections } from "src/common/enum/collections.enum";
import { FirebaseService } from "src/firebase/firebase.service";
import { HelpersService } from "src/helpers/helpers.service";

@Injectable()
export class UserModel {
    constructor (
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
        private readonly helpersService: HelpersService
    ) {}

    async getAll () {
        try {
            const snapshot = await this.firebaseAdmin.firestore().collection(Collections.USER).get();
            let data = [];

            snapshot.forEach((snap) => {
                data.push({
                    id: snap.id,
                    data: snap.data()
                });
            });

            return data;
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

            return {
                id: snapshot.id,
                data: snapshot.data()
            }
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

            // if(!snapshot) {
            //     return null;
            // }

            console.log(snapshot.docs);

            if(snapshot.docs.length === 0) {
                return null;
            }

            return {
                id: snapshot.docs[0].id,
                data: snapshot.docs[0].data()
            };
        } catch (error) {
            this.helpersService.handleException (
                'userModel.model',
                'getBy',
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
                profileImage: null
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