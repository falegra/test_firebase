import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    constructor (
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App
    ) {}

    async getUsers (
        collection: string
    ) {
        try {
            // const snapshot = await this.firebaseAdmin.firestore().collection('users').get();

            // snapshot.docs.forEach(async (doc) => {
            //     // console.log(doc.data());
            //     console.log(doc.ref.);
            // });

            // return snapshot.docs.map((doc) => doc.data())
            const snapshot = await this.firebaseAdmin.firestore().collection(collection).get();
            snapshot.forEach((snap) => {
                console.log({
                    id: snap.id,
                    data: snap.data()
                });
            });
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
}
