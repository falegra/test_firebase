import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UserModel } from './model/user.model';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    FirebaseModule,
    HelpersModule,
    ProfileModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserModel
  ],
  exports: [
    UserService,
    UserModel
  ]
})
export class UserModule {}
