import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

//needed npm and node.
// $ npm i -g @nestjs/cli
// $ nest new project-name
//$ npm install --save @nestjs/swagger
//npm i @mikro-orm/cli
