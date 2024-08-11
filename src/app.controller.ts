import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor (
    private readonly firebaseService: FirebaseService
  ) {}

  @Get()
  async getUsers() {
    return await this.firebaseService.getUsers('users');
  }

  @Post()
  async addUser (
    @Body() user: any
  ) {
    return await this.firebaseService.addUser(user);
  }
}
