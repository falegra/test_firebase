import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { HelpersModule } from './helpers/helpers.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule,
    UserModule,
    HelpersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
