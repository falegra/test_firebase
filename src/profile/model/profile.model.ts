import { Inject, Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { Collections } from "src/common/enum/collections.enum";
import { HelpersService } from "src/helpers/helpers.service";
import { addProfileDto } from "src/user/dto/addProfile.dto";

@Injectable()
export class ProfileModel {
    constructor (
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
        private readonly helpersService: HelpersService
    ) {}

    async handleAddProfile (
        {ci, name, lastName, phone}: addProfileDto
    ) {
        try {
            const createdDate = new Date().getTime() + '';

            const docRef = await this.firebaseAdmin.firestore().collection(Collections.PROFILE).add({
                name,
                lastName,
                phone,
                ci,
                createdDate
            });

            return docRef.id;
        } catch (error) {
            this.helpersService.handleException (
                'profile.model',
                'handleAddProfile',
                error
            );
        }
    }
}