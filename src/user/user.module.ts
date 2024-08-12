import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { UserModel } from './model/userModel.model';

@Module({
  imports: [
    FirebaseModule,
    HelpersModule
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
