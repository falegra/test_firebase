import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

@Module({
  controllers: [FirebaseController],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        // const serviceAccount = require('../serviceAccountKey.json');
        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: 'prueba-968ef',
            clientEmail: 'firebase-adminsdk-32jmr@prueba-968ef.iam.gserviceaccount.com',
            privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbabUOl15D4w4V\n54YpwyuJ9y54Za9xq2ccySlMHtI1y8YsX9Lr2CiBU4fla1/8N5SuKd3ASg0i/Io/\nPuSCr+yQ9LtojNnxKhyqQqCqqEP+vCCqcnPVbGgNXEdkMyedLyZZ/vnp4eQyiqcW\nh9VbN/onrV0wakEd70gJ19YzqbzODJiirPd1GuNjfn6RyyEm1BusS64Gu/9wrVNq\nWU7jWBfaneerhY2t51tARJXtX+TxITEkZ68NbuHYLJ7IU7Q89BC1Fm42lG0ZScLO\n5Ska3GWfEZ34l9BV7z/d+K+m72d5QvV2tJxuDw42A5C/DBCZZRGI7ESk2S6xuTts\nVfzoNchHAgMBAAECggEAUbMLwxIj/J1IOmnKcDSHOsk6mYQrjuTm8TYKVZjIZ1Wo\nRg+sRztm4bkLyiZwSEcd6rgWJSqtt5BXnfM6PVtqeBNY0TZZVM58e/1xO/qJzwmY\nFD+n2BmUqRzqTGor3wCWhD5IKol9YkB0tRQBIwU19Z49K/D0rEPUDC49SWFztzkS\np9YdyLVMLkS1nuM2ehW11e36ipaUdaH9wTIdIYitz62VHOA0Nai6JRtvuYZQDpPR\nGD+UQY/WH9IzJsrY5wRw8fo9PZPgf/xnSCp59KKDTut7SbQySHg+StyN8AKrC1ac\ntZ3enEgqoy9s6GE1QXZ04JbgWmeqFyC6ddw8nUWRcQKBgQD8WXRT77x2AST2tcKi\n1v/tWt6JmVVqRDH7ErXOfVd4luQs/SuvGQAffaJJJxcobGZprJsuO14ra8NSab3z\nWdvlpWJVHN+SYHUvOz7VQbk0uk1PrIxd43Hf+Yw8OoejGFe48Wy9CoJhAW5qrDVp\nVcbnAwbCGu2BF+iNFimnJ2wWXwKBgQDelkbGAVA8GrNfZC5Jcm9g4CmGp5HALBFl\ntz13py6WgwAJ8UxV9xL7HpZ1N0Q9iC6r2zMrJ09q7UX8zztsQER9s4LNA7+jR/QW\nUGXHM2HnZH2z1+DQUeE0bdHKlU0u/l03IEhSQiZqeLfENapwjz85MDO8/9rTPjQS\ni9s3o9UHGQKBgFFgT4EZ2D59k/vzFTcJ+jICkazxw3enUi7TE8no5aI/loljgwjO\nGRoOm5zXfEJO4p/FR62a+30pHS2gZ97n5V+i+5jS3M4JSQDYLCT9MspsIa5FyGYm\niHxfrvdlMIRJv1AmmphDoVPC8GZ57idvv9qTQUSrBlgQ669DrF74+YQlAoGAODTQ\nWE2amiLP6qWcfpV0BI12TvdfeZxnJD06O02vGPipeNlCwm5qj5jwu1aiV7tcta7b\nY+lAR6r0wlr+EV7FLMy4mdZ5fNy9iSjyGnQiI9EfYNuBfHlAmgGlOTesTtKSbUos\nmQD1PGuRU+2NRXEWsPU4C2C8PB13/rrsN0eaknkCgYAIdWBuvSmk9jpzm3bzExle\nR+mlUlJud+uHqzRRcavbYf1QUniL+rtJjHChoixe5ol9rnSvLd4lGXHyes5Z5dvQ\nYrfDCxlckkrJhuRXFtIuPfhhV3vs13BFsYS6StsbUhNP4KdHW8l3jgKuH/ZbIQUW\nTMNd21tIFYmRRAY5cP8KPw==\n-----END PRIVATE KEY-----\n'
          }),
          databaseURL: 'https://prueba-968ef-default-rtdb.firebaseio.com/'
        });
      },
    },
    FirebaseService
  ],
  exports: ['FIREBASE_ADMIN', FirebaseService],
})
export class FirebaseModule {}