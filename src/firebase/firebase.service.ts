import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { Collections } from 'src/common/enum/collections.enum';

@Injectable()
export class FirebaseService {
    constructor (
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App
    ) {}

    async get (
        collection: Collections
    ) {
        try {
            const snapshot = await this.firebaseAdmin.firestore().collection(collection).get();
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
        collection: Collections,
        id: string
    ) {
        try {
            const snapshot = await this.get(collection);
            let data = null;

            snapshot.forEach((snap) => {
                if(snap.id === id) {
                    data = {
                        id: snap.id,
                        data: snap.data()
                    }
                }
            });

            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    async addUser (user: any) {
        console.log(user);
        try {
            const docRef = await this.firebaseAdmin.firestore().collection('users').add(user);
            return docRef.id;
            // return 'asd';
        } catch (error) {
            console.log(error.message);
        }
    }

    async uploadFile (
        filePath: string
    ) {
        try {
            const uploadedFile = await this.firebaseAdmin.storage().bucket().upload(filePath);
            console.log(uploadedFile);
            return 200;
        } catch (error) {
            console.log(`[ERROR] - uploadFile - firebase.service.ts`);
            console.log(error.message);
        }
    }
}
