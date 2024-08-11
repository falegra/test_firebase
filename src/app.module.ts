import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [FirebaseModule, UserModule, HelpersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
