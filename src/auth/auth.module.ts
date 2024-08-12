import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    UserModule,
    HelpersModule,
    FirebaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
