import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { ProfileModel } from './model/profile.model';

@Module({
  imports: [
    FirebaseModule,
    HelpersModule
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileModel
  ],
  exports: [
    ProfileService,
    ProfileModel
  ]
})
export class ProfileModule {}
